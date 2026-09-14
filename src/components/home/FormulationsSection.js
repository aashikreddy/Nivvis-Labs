import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import labPhoto from "../../assets/optimized/ui/lab.webp";

const FormulationsSection = () => {
  return (
    <section
      className="formulations-corporate-section py-5 my-5"
      id="formulations"
      aria-labelledby="formulations-heading"
    >
      <Container className="container-nivvis">
        <Row className="gy-5 align-items-start">
          {/* Left Column: Asymmetric Narrative (~58% desktop: Col lg={7}) */}
          <Col lg={7} className="pe-lg-4 pe-xl-5">
            <span className="formulations-badge">
              Formulation &amp; Development
            </span>
            <h2 id="formulations-heading" className="formulations-title mb-3">
              Formulation-Focused Development for Chronic Care
            </h2>
            <p className="formulations-intro mb-4">
              Nivvis Labs&apos; portfolio reflects a formulation-focused
              approach to solid oral dosage forms, including fixed-dose
              combinations, modified-release tablets, capsules, and softgel
              formulations across core areas of chronic care.
            </p>

            {/* 3 Numbered Development Pillars */}
            <div className="formulations-pillars mb-4">
              {/* Pillar 01 */}
              <article className="formulations-pillar-item">
                <div className="formulations-pillar-num" aria-hidden="true">
                  01
                </div>
                <div className="formulations-pillar-content">
                  <h3 className="formulations-pillar-heading">
                    Modified-Release Formulations
                  </h3>
                  <p className="formulations-pillar-body mb-0">
                    Selected formulations use Extended Release (ER) or Sustained
                    Release (SR) dosage forms, as reflected in products such as
                    Telsyday Trio 50 and Cobastart P.
                  </p>
                </div>
              </article>

              {/* Pillar 02 */}
              <article className="formulations-pillar-item">
                <div className="formulations-pillar-num" aria-hidden="true">
                  02
                </div>
                <div className="formulations-pillar-content">
                  <h3 className="formulations-pillar-heading">
                    Fixed-Dose Combinations
                  </h3>
                  <p className="formulations-pillar-body mb-0">
                    The portfolio includes dual- and triple-active formulations
                    across cardiovascular, lipid-management, and diabetes care,
                    bringing multiple active ingredients together within a
                    single dosage form.
                  </p>
                </div>
              </article>

              {/* Pillar 03 */}
              <article className="formulations-pillar-item">
                <div className="formulations-pillar-num" aria-hidden="true">
                  03
                </div>
                <div className="formulations-pillar-content">
                  <h3 className="formulations-pillar-heading">
                    Diverse Dosage &amp; Delivery Forms
                  </h3>
                  <p className="formulations-pillar-body mb-0">
                    The portfolio includes tablets, capsules, softgel capsules,
                    and delayed-release formulations, demonstrating breadth
                    across different pharmaceutical dosage forms. Spansave DSR
                    uses a delayed-release capsule formulation. Cobastart is
                    presented as a softgel capsule.
                  </p>
                </div>
              </article>
            </div>

            {/* Section CTA */}
            <div className="pt-2">
              <Link
                to="/product"
                className="formulations-cta-btn"
                aria-label="View complete formulation portfolio in our product catalogue"
              >
                View Complete Formulation Portfolio{" "}
                <span className="ms-1" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          </Col>

          {/* Right Column: Technical Modality Matrix (~42% desktop: Col lg={5}) */}
          <Col lg={5}>
            <div className="formulations-matrix-panel mb-4">
              <div className="formulations-matrix-header">
                <span className="formulations-matrix-subtitle">
                  Technical Portfolio Specification
                </span>
                <h3 className="formulations-matrix-title">
                  DOSAGE &amp; DELIVERY MODALITIES
                </h3>
              </div>

              <div className="formulations-matrix-list">
                {/* ITEM 1 */}
                <div className="formulations-matrix-row">
                  <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-1">
                    <h4 className="formulations-modality-name">
                      Extended &amp; Sustained Release
                    </h4>
                    <span className="formulations-form-tag">
                      Tablets &mdash; ER / SR
                    </span>
                  </div>
                  <div className="formulations-app-text">
                    <span className="formulations-field-label">
                      Application:
                    </span>{" "}
                    Cardiovascular &amp; Neuropathic Care
                  </div>
                  <div className="formulations-ref-text">
                    <span className="formulations-field-label">
                      Reference Examples:
                    </span>{" "}
                    Telsyday Trio 50, Cobastart P
                  </div>
                </div>

                {/* ITEM 2 */}
                <div className="formulations-matrix-row">
                  <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-1">
                    <h4 className="formulations-modality-name">
                      Fixed-Dose Combinations
                    </h4>
                    <span className="formulations-form-tag">
                      Dual &amp; Triple Combinations
                    </span>
                  </div>
                  <div className="formulations-app-text">
                    <span className="formulations-field-label">
                      Application:
                    </span>{" "}
                    Hypertension, Lipids &amp; Diabetes
                  </div>
                  <div className="formulations-ref-text">
                    <span className="formulations-field-label">
                      Reference Examples:
                    </span>{" "}
                    Telsyday AMH, Rosufame Gold 10, Practoglim M1 / M2
                  </div>
                </div>

                {/* ITEM 3 */}
                <div className="formulations-matrix-row">
                  <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-1">
                    <h4 className="formulations-modality-name">
                      Delayed-Release Formulations
                    </h4>
                    <span className="formulations-form-tag">
                      Delayed-Release Capsule
                    </span>
                  </div>
                  <div className="formulations-app-text">
                    <span className="formulations-field-label">
                      Application:
                    </span>{" "}
                    Gastrointestinal Care
                  </div>
                  <div className="formulations-ref-text">
                    <span className="formulations-field-label">
                      Reference Example:
                    </span>{" "}
                    Spansave DSR
                  </div>
                </div>

                {/* ITEM 4 */}
                <div className="formulations-matrix-row border-bottom-0 pb-0">
                  <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-1">
                    <h4 className="formulations-modality-name">
                      Softgel &amp; Nutrient Formulations
                    </h4>
                    <span className="formulations-form-tag">
                      Softgel / Multi-Ingredient
                    </span>
                  </div>
                  <div className="formulations-app-text">
                    <span className="formulations-field-label">
                      Application:
                    </span>{" "}
                    Neurological &amp; Nutritional Support
                  </div>
                  <div className="formulations-ref-text">
                    <span className="formulations-field-label">
                      Reference Examples:
                    </span>{" "}
                    Cobastart, Cobastart XT, Emcovit Gold
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Restrained Cleanroom Visual */}
            <div className="formulations-photo-card">
              <img
                src={labPhoto}
                alt="Pharmaceutical formulation testing and analysis"
                className="formulations-photo-img"
                loading="lazy"
                decoding="async"
                width="800"
                height="450"
              />
              <div className="formulations-photo-caption">
                Pharmaceutical formulation testing and analysis
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FormulationsSection;
