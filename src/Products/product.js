import React, { useMemo, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { categories, products } from "./productsData";
import CategorySection, {
  ProductCard,
} from "../components/products/CategorySection";
import "../styles/catalogue.css";

// Formatter for readable therapeutic category labels aligned with repository taxonomy
const formatCategoryName = (categoryName) => {
  switch (categoryName) {
    case "ANTI HYPERTENSION":
      return "Anti-Hypertension";
    case "LIPIDS":
      return "Lipids";
    case "NEUROPATHIC PAIN":
      return "Neuropathic Pain";
    case "PAIN MANAGEMENT":
      return "Pain Management";
    case "CALCIUM & VITAMIN DEFICIENCY":
      return "Calcium & Vitamin Deficiency";
    case "DIABETES":
      return "Diabetes";
    case "OTHERS":
      return "Others";
    default:
      return categoryName;
  }
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read filter state from URL — preserves on refresh, restored by Back/Forward
  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    document.title = "Products | Nivvis Labs";
    return () => {
      document.title = "Nivvis Labs";
    };
  }, []);

  // Compute product counts dynamically from authoritative productsData.js
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    categories.forEach((cat) => {
      counts[cat.id] = products.filter((p) => p.category === cat.name).length;
    });
    return counts;
  }, []);

  // Filter products by active category and search query
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      // 1. Category filter
      if (selectedCategory !== "all") {
        const activeCat = categories.find((c) => c.id === selectedCategory);
        if (activeCat && product.category !== activeCat.name) {
          return false;
        }
      }

      // 2. Search query filter (against only verified reliable fields)
      if (query) {
        const matchName = product.name?.toLowerCase().includes(query);
        const matchDisplayName = product.displayName
          ?.toLowerCase()
          .includes(query);
        const matchSlug = product.slug?.toLowerCase().includes(query);
        const matchUses = product.uses?.toLowerCase().includes(query);

        if (!matchName && !matchDisplayName && !matchSlug && !matchUses) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const isFiltered = selectedCategory !== "all" || searchQuery.trim() !== "";

  const handleSearchChange = (value) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set("search", value);
        } else {
          next.delete("search");
        }
        return next;
      },
      { replace: true },
    );
  };

  const handleCategoryChange = (catId) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (catId === "all") {
        next.delete("category");
      } else {
        next.set("category", catId);
      }
      return next;
    });
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  const activeCategoryObj =
    selectedCategory !== "all"
      ? categories.find((c) => c.id === selectedCategory)
      : null;

  return (
    <Container as="main" className="container-nivvis my-5 flex-grow-1">
      {/* Header Intro */}
      <div className="text-center mb-5 pb-2">
        <span
          className="text-uppercase fw-bold text-accent mb-2 d-block"
          style={{ letterSpacing: "1px", fontSize: "0.875rem" }}
        >
          Our Products
        </span>
        <h1 className="text-h1 text-primary fw-bold mb-3">
          Therapeutic Excellence
        </h1>
        <p
          className="text-body text-text-secondary mx-auto fs-5"
          style={{ maxWidth: "700px" }}
        >
          Explore our comprehensive range of high-quality pharmaceutical
          products designed to meet diverse therapeutic needs and improve global
          health outcomes.
        </p>
      </div>

      {/* Discovery Toolbar: Search + Category Filters + Results Summary */}
      <section
        className="catalogue-discovery-toolbar"
        aria-label="Catalogue Search and Category Filters"
      >
        {/* Search Input Box */}
        <div className="catalogue-search-wrapper">
          <label htmlFor="catalogue-search-input" className="visually-hidden">
            Search products or therapeutic uses
          </label>
          <svg
            className="catalogue-search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            id="catalogue-search-input"
            type="search"
            className="catalogue-search-input"
            placeholder="Search products or therapeutic uses..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="catalogue-search-clear"
              aria-label="Clear search query"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {/* Therapeutic Category Filter Pills */}
        <div
          className="catalogue-category-scroll"
          role="toolbar"
          aria-label="Filter by therapeutic category"
        >
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className={`catalogue-pill-btn ${selectedCategory === "all" ? "active" : ""}`}
            aria-pressed={selectedCategory === "all"}
          >
            <span>All Formulations</span>
            <span className="catalogue-pill-count">{categoryCounts.all}</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`catalogue-pill-btn ${selectedCategory === cat.id ? "active" : ""}`}
              aria-pressed={selectedCategory === cat.id}
            >
              <span>{formatCategoryName(cat.name)}</span>
              <span className="catalogue-pill-count">
                {categoryCounts[cat.id] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Results Counter & Reset Action */}
        <div className="catalogue-results-bar">
          <p className="catalogue-results-count" aria-live="polite">
            Showing <strong>{filteredProducts.length}</strong> of{" "}
            <strong>{products.length}</strong> products
            {isFiltered && activeCategoryObj && (
              <span>
                {" "}
                in <em>{formatCategoryName(activeCategoryObj.name)}</em>
              </span>
            )}
            {searchQuery.trim() && (
              <span>
                {" "}
                matching &ldquo;<strong>{searchQuery.trim()}</strong>&rdquo;
              </span>
            )}
          </p>

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="catalogue-reset-btn"
              aria-label="Reset all search and category filters"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* Catalogue Product Results: Grouped (default) or Unified Grid (filtered) */}
      {isFiltered ? (
        filteredProducts.length === 0 ? (
          <div className="catalogue-empty-state">
            <div className="catalogue-empty-icon" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
            <h2 className="text-h3 text-primary fw-bold mb-2">
              No Products Found
            </h2>
            <p
              className="text-body text-text-secondary mx-auto mb-4"
              style={{ maxWidth: "460px" }}
            >
              We couldn&apos;t find any formulations matching your search or
              filter criteria. Try a different product name, therapeutic use, or
              clear your active filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn btn-primary px-4 py-2 fw-medium"
              style={{
                backgroundColor: "var(--color-primary)",
                borderColor: "var(--color-primary)",
                minHeight: "44px",
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <section
            className="mb-5 pb-3"
            aria-label="Filtered Product Formulations"
          >
            <Row className="gy-4">
              {filteredProducts.map((product) => (
                <Col key={product.id} xl={3} lg={4} md={6} sm={12}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </section>
        )
      ) : (
        categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            products={products}
          />
        ))
      )}

      <div className="pb-5 mb-5"></div>
    </Container>
  );
};

export default Products;
