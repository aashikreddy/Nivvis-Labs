import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const ProductNotFound = ({ productName }) => {
  useEffect(() => {
    document.title = "Product Not Found | Nivvis Labs";
    return () => {
      document.title = "Nivvis Labs";
    };
  }, []);

  return (
    <Container className="container-nivvis my-5 py-5 flex-grow-1 d-flex justify-content-center align-items-center">
      <Card
        className="border-0 shadow-sm bg-surface-nivvis p-5 text-center radius-lg w-100"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-4" aria-hidden="true">
          <FiSearch
            style={{ fontSize: "3rem", opacity: 0.5 }}
            className="text-muted-nivvis"
          />
        </div>
        <h1 className="text-h2 text-primary fw-bold mb-3">Product Not Found</h1>
        <p className="text-body text-text-secondary mb-4 fs-5">
          We couldn't find the product{" "}
          <strong className="text-primary">"{productName}"</strong> in the
          current catalogue.
        </p>
        <div>
          <Link
            to="/product"
            className="btn btn-primary px-4 py-2 fw-medium"
            style={{
              backgroundColor: "var(--color-primary)",
              borderColor: "var(--color-primary)",
            }}
          >
            Return to Products Catalogue
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default ProductNotFound;
