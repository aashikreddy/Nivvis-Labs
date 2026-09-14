import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import img4 from "../assets/optimized/ui/img4.webp";
import ContactForm from "../components/about/ContactForm";
import ContactCards from "../components/about/ContactCards";
import LocationMap from "../components/about/LocationMap";

const About = () => {
  React.useEffect(() => {
    document.title = "About & Contact | Nivvis Labs";
    return () => {
      document.title = "Nivvis Labs";
    };
  }, []);

  return (
    <main className="bg-background-nivvis flex-grow-1 py-5">
      {/* Page Header */}
      <Container className="container-nivvis text-center mb-5 pb-3">
        <span
          className="text-uppercase fw-bold text-accent mb-2 d-block"
          style={{ letterSpacing: "1px", fontSize: "0.875rem" }}
        >
          About & Contact
        </span>
        <h1 className="text-h1 text-primary fw-bold mb-3">
          Corporate Profile & Mission
        </h1>
        <p
          className="text-body text-text-secondary mx-auto fs-5"
          style={{ maxWidth: "720px" }}
        >
          Committed to delivering accessible, high-quality pharmaceutical care
          with a focused dedication to chronic disease management across India.
        </p>
      </Container>

      {/* Corporate Overview Section */}
      <Container className="container-nivvis section-nivvis mb-5 pb-5 border-bottom">
        <Row className="gy-5 align-items-center">
          <Col lg={7} className="pe-lg-5">
            <h2 className="text-h2 text-primary fw-bold mb-4">
              Corporate Overview
            </h2>
            <div
              className="text-body text-text-primary fs-5"
              style={{ lineHeight: "1.7" }}
            >
              <p className="mb-4">
                Nivvis Labs is dedicated to delivering high-quality, affordable
                pharmaceutical medications with an enduring commitment to
                chronic disease management. Founded with a vision to enhance
                patient care, we focus on formulation integrity, therapeutic
                accessibility, and reliable healthcare partnerships.
              </p>
              <p className="mb-3 fw-medium text-primary">
                Our operational mission focuses on:
              </p>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex">
                  <span className="text-accent me-2" aria-hidden="true">
                    &#10003;
                  </span>
                  <span>
                    Targeted therapeutic formulations across hypertension,
                    diabetes, lipid management, and neuropathy.
                  </span>
                </li>
                <li className="mb-3 d-flex">
                  <span className="text-accent me-2" aria-hidden="true">
                    &#10003;
                  </span>
                  <span>
                    Affordable, quality-assured medications designed to support
                    consistent chronic-care adherence.
                  </span>
                </li>
                <li className="mb-3 d-flex">
                  <span className="text-accent me-2" aria-hidden="true">
                    &#10003;
                  </span>
                  <span>
                    Transparent product specifications, batch documentation
                    discipline, and supply integrity.
                  </span>
                </li>
                <li className="mb-3 d-flex">
                  <span className="text-accent me-2" aria-hidden="true">
                    &#10003;
                  </span>
                  <span>
                    Addressing chronic healthcare challenges across communities
                    and clinical networks in India.
                  </span>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={5}>
            <div className="position-relative">
              <img
                src={img4}
                alt="Nivvis Labs Corporate Operations"
                className="img-fluid rounded shadow-md w-100 object-fit-cover"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
                style={{
                  maxHeight: "450px",
                  width: "100%",
                  aspectRatio: "3/2",
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Contact & Form Section */}
      <Container
        className="container-nivvis section-nivvis mb-5"
        id="contact-form"
      >
        <div className="text-center mb-5">
          <h2 className="text-h2 text-primary fw-bold mb-3">Get in Touch</h2>
          <p
            className="text-body text-text-secondary mx-auto"
            style={{ maxWidth: "600px" }}
          >
            We welcome inquiries regarding our pharmaceutical products,
            partnerships, or general corporate information.
          </p>
        </div>

        <Row className="gy-5">
          <Col lg={4}>
            <ContactCards />
          </Col>
          <Col lg={8} className="ps-lg-5">
            <div className="bg-surface-nivvis p-4 p-md-5 rounded shadow-sm border border-border">
              <h3 className="text-h4 text-primary mb-4">Send us a Message</h3>
              <ContactForm />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Location Map Section */}
      <LocationMap />
    </main>
  );
};

export default About;
