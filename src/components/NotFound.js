import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  React.useEffect(() => {
    document.title = "Page Not Found | Nivvis Labs";
    return () => {
      document.title = "Nivvis Labs";
    };
  }, []);

  return (
    <main className="bg-background-nivvis flex-grow-1 d-flex align-items-center py-5">
      <Container className="container-nivvis text-center py-5">
        <span
          className="text-uppercase fw-bold text-accent mb-2 d-block"
          style={{ letterSpacing: "1px", fontSize: "0.875rem" }}
        >
          Error 404
        </span>
        <h1 className="text-h1 text-primary fw-bold mb-4">Page Not Found</h1>
        <p
          className="text-body-lg text-muted-nivvis mb-5 mx-auto"
          style={{ maxWidth: "520px" }}
        >
          The page you are looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <Link
            to="/"
            className="btn btn-primary px-4 py-2 fw-medium"
            style={{
              backgroundColor: "var(--color-primary)",
              borderColor: "var(--color-primary)",
            }}
          >
            Go to Homepage
          </Link>
          <Link
            to="/product"
            className="btn btn-outline-primary px-4 py-2 fw-medium"
            style={{
              color: "var(--color-primary)",
              borderColor: "var(--color-primary)",
            }}
          >
            Browse Products
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default NotFound;
