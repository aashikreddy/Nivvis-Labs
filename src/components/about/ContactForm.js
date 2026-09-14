import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get("subject") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subjectParam,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: "idle",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side restrained validation compatible with backend
    const phoneRegex = /^[0-9+\-() ]+$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setSubmitStatus({
        type: "error",
        message:
          "Please enter a valid phone number (digits, spaces, hyphens, parentheses, and optional leading +).",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "idle", message: "" });

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you for contacting Nivvis Labs. Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else if (response.status === 400) {
        setSubmitStatus({
          type: "error",
          message: "Please check your details and try again.",
        });
      } else if (response.status === 429) {
        setSubmitStatus({
          type: "error",
          message:
            "Too many attempts. Please wait a few minutes and try again.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            "We couldn't send your message right now. Please try again later.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "We couldn't send your message right now. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate={false}>
      {submitStatus.type !== "idle" && (
        <Alert
          variant={submitStatus.type === "success" ? "success" : "danger"}
          role={submitStatus.type === "success" ? "status" : "alert"}
          className="mb-4 text-small"
        >
          {submitStatus.message}
        </Alert>
      )}

      <Form.Group className="mb-4" controlId="name">
        <Form.Label className="fw-medium text-small text-text-secondary">
          Full Name <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          aria-required="true"
          maxLength={100}
          value={formData.name}
          onChange={handleChange}
          className="py-2"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="email">
        <Form.Label className="fw-medium text-small text-text-secondary">
          Email Address <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          aria-required="true"
          maxLength={254}
          value={formData.email}
          onChange={handleChange}
          className="py-2"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="phone">
        <Form.Label className="fw-medium text-small text-text-secondary">
          Phone Number <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          required
          aria-required="true"
          maxLength={30}
          pattern="^[0-9+\-() ]+$"
          title="Please enter a valid phone number"
          value={formData.phone}
          onChange={handleChange}
          className="py-2"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="subject">
        <Form.Label className="fw-medium text-small text-text-secondary">
          Subject <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="subject"
          placeholder="What is this regarding?"
          required
          aria-required="true"
          maxLength={200}
          value={formData.subject}
          onChange={handleChange}
          className="py-2"
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="message">
        <Form.Label className="fw-medium text-small text-text-secondary">
          Message
        </Form.Label>
        <Form.Control
          as="textarea"
          name="message"
          rows={4}
          placeholder="How can we help you?"
          maxLength={5000}
          value={formData.message}
          onChange={handleChange}
          className="py-2"
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={isSubmitting}
        className="w-100 py-3 fw-bold"
        style={{
          backgroundColor: "var(--color-primary)",
          borderColor: "var(--color-primary)",
          minHeight: "48px",
        }}
        aria-label={
          isSubmitting ? "Sending your message" : "Submit your message"
        }
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </Form>
  );
};

export default ContactForm;
