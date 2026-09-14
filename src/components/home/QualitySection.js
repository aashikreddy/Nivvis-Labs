import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const QualitySection = () => {
  return (
    <section
      className="quality-corporate-section py-5"
      id="quality"
      aria-labelledby="quality-heading"
    >
      <Container className="container-nivvis py-lg-4">
        {/* Section Header */}
        <div className="quality-header mb-5">
          <span className="quality-badge">Quality Approach</span>
          <h2 id="quality-heading" className="quality-title mb-3">
            A Disciplined Approach to Quality &amp; Consistency
          </h2>
          <p className="quality-lead mb-0">
            Nivvis Labs&apos; pharmaceutical portfolio is supported by defined
            product compositions, established dosage forms, protective blister
            packaging, and clear product documentation for healthcare and
            distribution partners.
          </p>
        </div>

        {/* Three Quality Principles */}
        <Row className="gy-4 mb-5">
          {/* Principle 01 */}
          <Col lg={4} md={6}>
            <article className="quality-principle-block h-100">
              <div className="quality-principle-top">
                <span className="quality-principle-num" aria-hidden="true">
                  01
                </span>
              </div>
              <h3 className="quality-principle-title mb-3">
                Composition Discipline
              </h3>
              <p className="quality-principle-body mb-0">
                Each product is presented with defined active ingredients,
                strengths, and dosage-form information, providing a clear
                foundation for consistent product identification across the
                portfolio.
              </p>
            </article>
          </Col>

          {/* Principle 02 */}
          <Col lg={4} md={6}>
            <article className="quality-principle-block h-100">
              <div className="quality-principle-top">
                <span className="quality-principle-num" aria-hidden="true">
                  02
                </span>
              </div>
              <h3 className="quality-principle-title mb-3">
                Packaging &amp; Product Integrity
              </h3>
              <p className="quality-principle-body mb-0">
                Selected solid oral formulations are presented in sealed blister
                packaging, with product labeling designed to clearly identify
                the formulation, strength, and relevant product information.
              </p>
            </article>
          </Col>

          {/* Principle 03 */}
          <Col lg={4} md={12}>
            <article className="quality-principle-block h-100">
              <div className="quality-principle-top">
                <span className="quality-principle-num" aria-hidden="true">
                  03
                </span>
              </div>
              <h3 className="quality-principle-title mb-3">
                Specification Transparency
              </h3>
              <p className="quality-principle-body mb-0">
                Product information is organized around clear composition,
                dosage-form, therapeutic-use, and product details, with direct
                communication channels available for healthcare professionals,
                distributors, and partners.
              </p>
            </article>
          </Col>
        </Row>

        {/* Quality Inquiry Callout */}
        <div className="quality-inquiry-callout">
          <Row className="align-items-center gy-3">
            <Col lg={8} md={7}>
              <h3 className="quality-inquiry-title mb-2">
                Formulation &amp; Quality Specifications
              </h3>
              <p className="quality-inquiry-desc mb-0">
                Review product compositions, strengths, and packaging
                specifications across our complete pharmaceutical portfolio.
              </p>
            </Col>
            <Col lg={4} md={5} className="text-md-end text-start pt-2 pt-md-0">
              <Link
                to="/product"
                className="quality-cta-btn"
                aria-label="Explore Nivvis Labs product portfolio"
              >
                Explore Product Portfolio{" "}
                <span className="ms-1" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default QualitySection;
