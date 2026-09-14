import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import lab from "../../assets/optimized/ui/image.webp";

const VisionSection = () => {
  return (
    <Container
      as="section"
      className="container-nivvis section-nivvis my-5 vision-corporate-section"
      id="vision"
    >
      <Row className="gy-5 align-items-center">
        {/* Left Column: Corporate Overview & Pillars */}
        <Col lg={7} className="pe-lg-5">
          <div className="mb-4">
            <span className="vision-badge">
              Corporate Overview &amp; Mission
            </span>
            <h2 className="vision-title mb-3">
              Pioneering Health Solutions for a Better Tomorrow
            </h2>
            <p className="vision-lead-text mb-4">
              <strong>Nivvis Labs</strong> is committed to fostering a healthier
              future by providing high-quality medications that empower
              individuals to manage and overcome illness effectively. Our vision
              is to be a trusted leader in healthcare, recognized for our
              dedication to improving patient outcomes through innovative,
              accessible, and patient-focused solutions.
            </p>
          </div>

          {/* Three Institutional Pillars */}
          <div className="d-flex flex-column gap-3">
            <div className="vision-pillar-card">
              <h3 className="vision-pillar-title">
                Accessibility &amp; Affordability
              </h3>
              <p className="vision-pillar-desc">
                Prioritizing accessible treatments to ensure essential
                medications reach patients without financial strain, bridging
                healthcare gaps across diverse communities.
              </p>
            </div>

            <div className="vision-pillar-card">
              <h3 className="vision-pillar-title">Chronic Care Focus</h3>
              <p className="vision-pillar-desc">
                Addressing long-term therapeutic needs with targeted
                formulations across cardiovascular health, diabetes, neuropathic
                care, and pain management.
              </p>
            </div>

            <div className="vision-pillar-card">
              <h3 className="vision-pillar-title">
                Quality &amp; Continuous Innovation
              </h3>
              <p className="vision-pillar-desc">
                Driving ongoing development and formulation improvements to
                address evolving healthcare challenges and deliver dependable
                therapeutic excellence.
              </p>
            </div>
          </div>
        </Col>

        {/* Right Column: Laboratory Image & Ethical Callout */}
        <Col lg={5}>
          <div className="vision-image-wrapper">
            <img
              src={lab}
              loading="lazy"
              className="vision-image"
              alt="Nivvis Labs Research and Quality Facility"
            />
          </div>

          {/* Integrated Institutional Callout (Clean Document Flow) */}
          <div className="vision-callout mt-4">
            <p className="vision-callout-quote">
              &ldquo;Ethical principles guide our practices at Nivvis Labs. Our
              focus remains steadfast on improving patient outcomes, supporting
              healthcare providers, and making a positive impact on therapeutic
              care.&rdquo;
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VisionSection;
