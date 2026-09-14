import React from "react";
import { Card } from "react-bootstrap";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const ContactCards = () => {
  return (
    <div className="d-flex flex-column gap-4 h-100">
      {/* Email Card */}
      <Card className="border-0 shadow-sm bg-surface-nivvis h-100">
        <Card.Body className="p-4 text-center d-flex flex-column align-items-center justify-content-center">
          <div
            className="rounded-circle bg-surface-muted d-flex align-items-center justify-content-center mb-3"
            style={{ width: "60px", height: "60px" }}
          >
            <FaEnvelope
              size={24}
              style={{ color: "var(--color-primary)" }}
              aria-hidden="true"
            />
          </div>
          <Card.Title className="text-h5 text-primary mb-2 fw-bold">
            Email
          </Card.Title>
          <Card.Text className="mb-0">
            <a
              href="mailto:nivvislabs2021@gmail.com"
              className="text-decoration-none text-body text-text-secondary hover-primary d-inline-flex align-items-center justify-content-center py-2 px-3 rounded"
              style={{ minHeight: "44px" }}
            >
              nivvislabs2021@gmail.com
            </a>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Phone Card */}
      <Card className="border-0 shadow-sm bg-surface-nivvis h-100">
        <Card.Body className="p-4 text-center d-flex flex-column align-items-center justify-content-center">
          <div
            className="rounded-circle bg-surface-muted d-flex align-items-center justify-content-center mb-3"
            style={{ width: "60px", height: "60px" }}
          >
            <FaPhone
              size={24}
              style={{ color: "var(--color-primary)" }}
              aria-hidden="true"
            />
          </div>
          <Card.Title className="text-h5 text-primary mb-2 fw-bold">
            Phone
          </Card.Title>
          <Card.Text className="mb-0">
            <a
              href="tel:+917702998819"
              className="text-decoration-none text-body text-text-secondary hover-primary d-inline-flex align-items-center justify-content-center py-2 px-3 rounded"
              style={{ minHeight: "44px" }}
            >
              +91 7702998819
            </a>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Registered Office Address Card */}
      <Card className="border-0 shadow-sm bg-surface-nivvis h-100">
        <Card.Body className="p-4 text-center d-flex flex-column align-items-center justify-content-center">
          <div
            className="rounded-circle bg-surface-muted d-flex align-items-center justify-content-center mb-3"
            style={{ width: "60px", height: "60px" }}
          >
            <FaMapMarkerAlt
              size={24}
              style={{ color: "var(--color-primary)" }}
              aria-hidden="true"
            />
          </div>
          <Card.Title className="text-h5 text-primary mb-2 fw-bold">
            Registered Office
          </Card.Title>
          <address
            className="text-body text-text-secondary mb-0 not-italic"
            style={{ lineHeight: "1.6", fontStyle: "normal" }}
          >
            R/o.205, Floor GRD, Sunder Kamala Nagar,
            <br />
            Laxmibai Kelkar Marg, Shastri Gully,
            <br />
            Manav Seva Singh, Sion,
            <br />
            Mumbai – 400022, India
          </address>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ContactCards;
