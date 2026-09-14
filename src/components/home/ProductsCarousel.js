import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Responsive configuration aligned with design system
const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1200, min: 768 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

// Display labels mapped for readable corporate presentation (matching Phase 11.4C)
const formatCategoryDisplay = (categoryName) => {
  switch (categoryName) {
    case "ANTI HYPERTENSION":
      return { label: "Anti-Hypertension", ref: null };
    case "LIPIDS":
      return { label: "Lipids & Cardiovascular", ref: null };
    case "NEUROPATHIC PAIN":
      return { label: "Neuropathic Pain", ref: null };
    case "PAIN MANAGEMENT":
      return { label: "Pain Management", ref: null };
    case "CALCIUM & VITAMIN DEFICIENCY":
      return { label: "Calcium & Vitamin Deficiency", ref: null };
    case "DIABETES":
      return { label: "Diabetes Care", ref: null };
    case "OTHERS":
      return {
        label: "Gastrointestinal & Supportive Care",
        ref: "Catalogue: Others",
      };
    default:
      return { label: categoryName, ref: null };
  }
};

const ProductsCarousel = ({ products }) => {
  const carouselRef = useRef(null);

  if (!products || products.length === 0) return null;

  const handlePrev = () => {
    carouselRef.current?.previous();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <section
      className="products-portfolio-section py-5 my-5"
      id="products"
      aria-labelledby="products-heading"
    >
      <Container className="container-nivvis">
        {/* Header with Title, Description, Section CTA, and Controls */}
        <div className="portfolio-header mb-5">
          <Row className="align-items-end gy-4">
            <Col lg={7}>
              <span className="portfolio-badge">Product Portfolio</span>
              <h2 id="products-heading" className="portfolio-title mb-3">
                Our Pharmaceutical Product Portfolio
              </h2>
              <p className="portfolio-intro mb-0">
                Explore Nivvis Labs&apos; portfolio of 21 products across core
                therapeutic categories.
              </p>
            </Col>
            <Col
              lg={5}
              className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-lg-end gap-3"
            >
              <Link
                to="/product"
                className="portfolio-catalogue-cta"
                aria-label="View complete 21-product catalogue"
              >
                View Complete Catalogue{" "}
                <span className="ms-1" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
              <div
                className="portfolio-nav-controls d-none d-md-flex align-items-center gap-2"
                aria-label="Carousel navigation"
              >
                <button
                  type="button"
                  onClick={handlePrev}
                  className="portfolio-nav-btn"
                  aria-label="Previous Products"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="portfolio-nav-btn"
                  aria-label="Next Products"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Carousel Track without overlapping controls */}
        <div className="portfolio-carousel-wrapper">
          <Carousel
            ref={carouselRef}
            responsive={responsive}
            ssr
            infinite
            keyBoardControl
            arrows={false}
            containerClass="portfolio-carousel-track pb-3"
            itemClass="px-2 px-lg-3"
            transitionDuration={450}
          >
            {products.map((product, index) => {
              const { label: categoryLabel, ref: categoryRef } =
                formatCategoryDisplay(product.category);
              const displayName = product.displayName || product.name;
              const formattedUses = product.uses
                ? product.uses.replace(/,/g, ", ")
                : "";

              return (
                <div key={product.id} className="h-100 py-2">
                  <article className="product-showcase-card h-100 d-flex flex-column">
                    {/* Packaging Image Box */}
                    <div className="product-card-img-box">
                      <img
                        className="product-card-img"
                        src={
                          product.images?.thumbnail || product.images?.primary
                        }
                        loading={index < 3 ? "eager" : "lazy"}
                        decoding="async"
                        alt={`${displayName} packaging`}
                      />
                    </div>

                    {/* Card Body */}
                    <div className="product-card-body d-flex flex-column flex-grow-1 p-4">
                      <div className="product-card-category-wrapper mb-2">
                        <span className="product-card-category">
                          {categoryLabel}
                        </span>
                        {categoryRef && (
                          <span className="product-card-category-ref ms-2">
                            ({categoryRef})
                          </span>
                        )}
                      </div>

                      <h3
                        className="product-card-title mb-2 text-truncate"
                        title={displayName}
                      >
                        {displayName}
                      </h3>

                      {formattedUses && (
                        <p
                          className="product-card-uses mb-4"
                          title={formattedUses}
                        >
                          {formattedUses}
                        </p>
                      )}

                      {/* Dedicated CTA */}
                      <div className="product-card-footer mt-auto pt-3 border-top">
                        <Link
                          to={`/product/${encodeURIComponent(product.slug)}`}
                          className="product-card-cta"
                          aria-label={`View details for ${displayName}`}
                        >
                          View Details{" "}
                          <span className="ms-1" aria-hidden="true">
                            &rarr;
                          </span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </Carousel>
        </div>
      </Container>
    </section>
  );
};

export default ProductsCarousel;
