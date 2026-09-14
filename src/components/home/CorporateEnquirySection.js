import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const CorporateEnquirySection = () => {
  return (
    <section
      className="enquiry-corporate-section py-5"
      id="corporate-enquiry"
      aria-labelledby="enquiry-heading"
    >
      <Container className="container-nivvis py-lg-4">
        <Row className="align-items-center gy-5">
          {/* Left Side: Corporate Message & CTA (~65% Desktop) */}
          <Col lg={7} xl={8} className="pe-lg-4 pe-xl-5">
            <div className="enquiry-corporate-copy">
              <span className="enquiry-corporate-badge">
                CORPORATE INQUIRIES &amp; PARTNERSHIPS
              </span>
              <h2
                id="enquiry-heading"
                className="enquiry-corporate-heading mb-3"
              >
                Partner with Nivvis Labs for Dependable Chronic Care
              </h2>
              <p className="enquiry-corporate-lead mb-4">
                Nivvis Labs welcomes inquiries from healthcare professionals,
                institutional distributors, pharmacies, and commercial partners.
                Whether you require detailed product specifications, formulation
                availability, or corporate collaboration details, our team is
                prepared to assist.
              </p>
              <div className="enquiry-cta-wrapper">
                <Link
                  to="/about#contact-form"
                  className="enquiry-corporate-cta"
                  aria-label="Submit corporate inquiry to Nivvis Labs"
                >
                  Submit Corporate Inquiry{" "}
                  <span className="ms-1" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </Col>

          {/* Right Side: Direct Contact Panel (~35% Desktop) */}
          <Col lg={5} xl={4}>
            <aside
              className="enquiry-contact-panel"
              aria-label="Direct Corporate Contact Coordinates"
            >
              <h3 className="enquiry-contact-title mb-2">
                Direct Communication
              </h3>
              <p className="enquiry-contact-subtitle mb-4">
                Direct corporate communication for commercial &amp; product
                inquiries.
              </p>

              <div className="enquiry-contact-list d-flex flex-column gap-3">
                {/* Headquarters */}
                <div className="enquiry-contact-item d-flex align-items-start">
                  <div
                    className="enquiry-contact-icon-box me-3 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <span className="enquiry-contact-label d-block">
                      Registered Headquarters
                    </span>
                    <span className="enquiry-contact-value">
                      Mumbai – 400022, India
                    </span>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="enquiry-contact-item d-flex align-items-start">
                  <div
                    className="enquiry-contact-icon-box me-3 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <FaPhone size={16} />
                  </div>
                  <div>
                    <span className="enquiry-contact-label d-block">
                      Direct Phone
                    </span>
                    <a
                      href="tel:+917702998819"
                      className="enquiry-contact-link"
                    >
                      +91 7702998819
                    </a>
                  </div>
                </div>

                {/* Corporate Email */}
                <div className="enquiry-contact-item d-flex align-items-start">
                  <div
                    className="enquiry-contact-icon-box me-3 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <FaEnvelope size={16} />
                  </div>
                  <div>
                    <span className="enquiry-contact-label d-block">
                      Corporate Email
                    </span>
                    <a
                      href="mailto:nivvislabs2021@gmail.com"
                      className="enquiry-contact-link"
                    >
                      nivvislabs2021@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CorporateEnquirySection;
