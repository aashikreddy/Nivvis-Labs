import React, { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { categories, products } from "../../Products/productsData";

// Factual therapeutic area descriptions strictly grounded in productsData.js
const THERAPEUTIC_DESCRIPTIONS = {
  "anti-hypertension":
    "Targeted combination and single-agent therapies indicated for hypertension management and long-term cardiovascular risk reduction.",
  lipids:
    "Statin and lipid-regulating formulations designed to manage elevated cholesterol and support cardiovascular wellness.",
  "neuropathic-pain":
    "Formulations designed to promote nerve fiber health, energy metabolism, and therapeutic support for neuropathic conditions.",
  "pain-management":
    "Targeted formulation for long-lasting relief from chronic pain and nerve-related discomfort.",
  "calcium-vitamin-deficiency":
    "Essential Calcium Carbonate and Vitamin D3 supplementation supporting bone density and skeletal strength.",
  diabetes:
    "Oral combination therapies formulated to support glycemic control in adults with type 2 diabetes mellitus.",
  others:
    "Formulations addressing acid-related gastrointestinal conditions, alongside comprehensive daily multivitamin support.",
};

// Professional readable titles with catalogue correspondence clarification
const getCategoryDisplayData = (category) => {
  switch (category.id) {
    case "anti-hypertension":
      return {
        title: "Anti-Hypertension",
        catalogueRef: null,
      };
    case "lipids":
      return {
        title: "Lipids & Cardiovascular",
        catalogueRef: null,
      };
    case "neuropathic-pain":
      return {
        title: "Neuropathic Pain",
        catalogueRef: null,
      };
    case "pain-management":
      return {
        title: "Pain Management",
        catalogueRef: null,
      };
    case "calcium-vitamin-deficiency":
      return {
        title: "Calcium & Vitamin Deficiency",
        catalogueRef: null,
      };
    case "diabetes":
      return {
        title: "Diabetes Care",
        catalogueRef: null,
      };
    case "others":
      return {
        title: "Gastrointestinal & Supportive Care",
        catalogueRef: "Catalogue: Others",
      };
    default:
      return {
        title: category.name,
        catalogueRef: null,
      };
  }
};

const ServicesSection = () => {
  // Dynamically map products per category from authoritative productsData.js
  const categoryProductsMap = useMemo(() => {
    const map = {};
    categories.forEach((c) => {
      map[c.name] = [];
    });
    products.forEach((p) => {
      if (map[p.category]) {
        map[p.category].push(p);
      }
    });
    return map;
  }, []);

  return (
    <Container
      as="section"
      className="container-nivvis section-nivvis my-5 py-4 therapeutic-corporate-section"
      id="therapeutic-areas"
      aria-labelledby="therapeutic-areas-heading"
    >
      {/* Section Header */}
      <div className="therapeutic-header mb-5">
        <Row className="align-items-end gy-4">
          <Col lg={8}>
            <span className="therapeutic-badge">Therapeutic Focus</span>
            <h2
              id="therapeutic-areas-heading"
              className="therapeutic-title mb-3"
            >
              Targeted Formulations Across Core Medical Disciplines
            </h2>
            <p className="therapeutic-intro mb-0">
              Nivvis Labs&apos; product portfolio spans 7 therapeutic categories
              and 21 products across areas of chronic care, cardiovascular
              health, metabolic health, pain management, and supportive care.
            </p>
          </Col>
          <Col lg={4} className="text-lg-end">
            <Link
              to="/product"
              className="therapeutic-catalogue-cta"
              aria-label="View complete 21-product catalogue"
            >
              View Complete Catalogue{" "}
              <span className="ms-1" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </Col>
        </Row>
      </div>

      {/* 7-Category Responsive Grid */}
      <Row className="g-4 justify-content-center">
        {categories.map((category) => {
          const categoryProducts = categoryProductsMap[category.name] || [];
          const count = categoryProducts.length;
          const representativeProducts = categoryProducts.slice(0, 3);
          const { title, catalogueRef } = getCategoryDisplayData(category);
          const description =
            THERAPEUTIC_DESCRIPTIONS[category.id] ||
            "High-quality pharmaceutical formulation for targeted patient care.";
          const IconComponent = category.icon;

          return (
            <Col
              key={category.id}
              xl={3}
              lg={4}
              md={6}
              xs={12}
              className="d-flex"
            >
              <article className="therapeutic-card w-100 d-flex flex-column">
                {/* Card Top Row: Vector Icon + Dynamic Product Count */}
                <div className="therapeutic-card-top d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="therapeutic-card-icon-wrapper"
                    aria-hidden="true"
                  >
                    {IconComponent && (
                      <IconComponent className="therapeutic-card-icon" />
                    )}
                  </div>
                  <span className="therapeutic-card-count">
                    {count} {count === 1 ? "Product" : "Products"}
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="therapeutic-card-title mb-1">{title}</h3>

                {/* Optional Catalogue Category Disambiguation */}
                {catalogueRef && (
                  <span className="therapeutic-card-catalogue-ref mb-2">
                    {catalogueRef}
                  </span>
                )}

                {/* Concise Factual Description */}
                <p className="therapeutic-card-desc mb-3 flex-grow-1">
                  {description}
                </p>

                {/* Representative Formulations */}
                <div className="therapeutic-card-products mb-3">
                  <span className="therapeutic-products-label d-block mb-1">
                    Representative Formulations:
                  </span>
                  <span className="therapeutic-products-list d-block">
                    {representativeProducts
                      .map((p) => p.displayName || p.name)
                      .join(" · ")}
                  </span>
                </div>

                {/* Action Link to Product Catalogue */}
                <div className="therapeutic-card-footer mt-auto pt-2 border-top">
                  <Link
                    to={`/product?category=${category.id}`}
                    className="therapeutic-card-link"
                    aria-label={`Explore ${title} products`}
                  >
                    Explore Products{" "}
                    <span className="ms-1" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </article>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ServicesSection;
