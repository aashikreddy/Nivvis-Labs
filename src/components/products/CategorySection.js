import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Human-readable therapeutic category labels
const formatCategoryName = (categoryName) => {
  if (!categoryName) return "";
  const normalized = categoryName.trim().toUpperCase();
  switch (normalized) {
    case "ANTI HYPERTENSION":
    case "ANTI-HYPERTENSION":
      return "Anti-Hypertension";
    case "LIPIDS":
      return "Lipids";
    case "NEUROPATHIC PAIN":
    case "NEUROPATHIC-PAIN":
      return "Neuropathic Pain";
    case "PAIN MANAGEMENT":
    case "PAIN-MANAGEMENT":
      return "Pain Management";
    case "CALCIUM & VITAMIN DEFICIENCY":
    case "CALCIUM-VITAMIN-DEFICIENCY":
      return "Calcium & Vitamin Deficiency";
    case "DIABETES":
      return "Diabetes";
    case "OTHERS":
      return "Others";
    default:
      return categoryName
        .replace(/-/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
  }
};

const ProductCard = ({ product }) => {
  const displayName = product.displayName || product.name;
  const categoryLabel = formatCategoryName(product.category);
  const imageSrc =
    product.images?.thumbnail || product.images?.primary || product.image;

  return (
    <article className="product-showcase-card catalogue-card">
      <div className="product-card-img-box">
        <img
          src={imageSrc}
          alt={displayName}
          className="product-card-img"
          loading="lazy"
          width="400"
          height="250"
        />
      </div>
      <div className="product-card-body">
        {categoryLabel && (
          <span className="product-card-category">{categoryLabel}</span>
        )}
        <h3 className="product-card-title" title={displayName}>
          {displayName}
        </h3>
        {product.uses && (
          <p className="product-card-uses" title={product.uses}>
            {product.uses}
          </p>
        )}
        <div className="product-card-footer">
          <Link
            to={`/product/${encodeURIComponent(product.name)}`}
            className="product-card-cta"
            aria-label={`View details for ${displayName}`}
          >
            <span>View Details</span>
            <span className="product-card-cta-arrow ms-1" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

const CategorySection = ({ category, products }) => {
  const categoryProducts = products.filter((p) => p.category === category.name);

  if (categoryProducts.length === 0) return null;

  return (
    <section className="mb-5 pb-3">
      <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
        <category.icon size={28} className="text-primary me-3" />
        <h2 className="text-h2 text-primary mb-0 fw-bold">
          {formatCategoryName(category.name)}
        </h2>
      </div>

      <Row className="gy-4">
        {categoryProducts.map((product) => (
          <Col key={product.id} xl={3} lg={4} md={6} sm={12}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export { ProductCard };
export default CategorySection;
