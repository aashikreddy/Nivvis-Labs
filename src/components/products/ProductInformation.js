import React from "react";
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

const ProductInformation = ({ product }) => {
  const info = product || {
    description: "",
    uses: "",
    displayName: "",
    name: "",
    category: "",
  };
  const displayName = info.displayName || info.name || "";
  const categoryLabel = formatCategoryName(info.category);
  const description = (info.description || "").trim();
  const formattedUses = info.uses ? info.uses.replace(/,\s*/g, ", ") : "";

  return (
    <div className="d-flex flex-column h-100">
      {/* Category Eyebrow & Product Title */}
      <div className="mb-2">
        {categoryLabel && (
          <span
            className="text-uppercase fw-bold text-accent mb-2 d-block"
            style={{ letterSpacing: "1px", fontSize: "0.875rem" }}
          >
            {categoryLabel}
          </span>
        )}
        <h1 className="text-h2 text-primary fw-bold mb-4">{displayName}</h1>
      </div>

      {/* Product Description Section */}
      <div className="mb-4">
        <h2 className="text-h4 text-primary mb-3">Product Description</h2>
        {description ? (
          <div
            className="text-body text-text-primary"
            style={{ lineHeight: "1.7" }}
          >
            {description}
          </div>
        ) : (
          <div
            className="text-body text-text-muted fst-italic"
            style={{ lineHeight: "1.7" }}
          >
            Product description information is currently unavailable.
          </div>
        )}
      </div>

      {/* Therapeutic Uses Section (Single canonical H2 callout) */}
      {formattedUses && (
        <div className="mb-4 p-4 bg-surface-muted rounded border-start border-4 border-primary">
          <h2 className="text-h4 text-primary mb-2">Therapeutic Uses</h2>
          <div className="text-body text-text-primary fw-medium">
            {formattedUses}
          </div>
        </div>
      )}

      {/* Action Area: Primary Enquiry + Secondary Catalogue Return */}
      <div className="mt-auto pt-4 border-top">
        <p className="text-small text-text-secondary mb-3">
          For detailed medical information or business enquiries regarding this
          product, please contact our team.
        </p>
        <div className="product-detail-actions d-flex flex-wrap align-items-center gap-3">
          <Link
            to={`/about?subject=${encodeURIComponent("Enquiry: " + displayName)}#contact-form`}
            className="btn btn-primary px-4 py-2 fw-medium"
            style={{
              backgroundColor: "var(--color-primary)",
              borderColor: "var(--color-primary)",
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Enquire About {displayName}
          </Link>
          <Link
            to="/product"
            className="btn btn-outline-primary px-3 py-2 fw-medium product-detail-back-btn"
            style={{
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &larr; Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
