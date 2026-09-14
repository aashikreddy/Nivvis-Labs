# Technical Audit & Improvement Plan

This document outlines a comprehensive technical audit of the Nivvis project, categorizing issues from critical security risks to structural and performance improvements.

---

## 1. Security (🔴 Critical / Immediate Action)

### **Exposed Credentials in Source Code**
*   **Issue:** The file `src/backend/server.js` contains hardcoded, plain-text email credentials (a Gmail app password). This is a massive security risk, especially if the repository is public or shared.
*   **Solution:** Immediately revoke the current app password in your Google account. Migrate all secrets to a `.env` file (e.g., `EMAIL_USER` and `EMAIL_PASS`) and load them using the `dotenv` package. Ensure `.env` is listed in your `.gitignore`.

### **Missing Input Validation & Rate Limiting**
*   **Issue:** The `/send-email` endpoint accepts arbitrary `req.body` data without validation or sanitization, making the endpoint highly susceptible to spam and malicious payload injection.
*   **Solution:** Implement a validation library (like `joi` or `express-validator`) on the backend. Add a CAPTCHA (like Google reCAPTCHA) on the frontend contact form. Integrate `express-rate-limit` to prevent automated spam.

### **Insecure CORS Configuration**
*   **Issue:** `app.use(cors())` is currently allowing requests from any origin (`*`).
*   **Solution:** Restrict CORS specifically to the URL of your frontend application (e.g., `http://localhost:3000` for dev, and your actual domain for production).

---

## 2. Code Quality & Architecture (🟠 High Priority)

### **Monolithic Folder Structure (Backend inside Frontend)**
*   **Issue:** The Express backend (`src/backend/server.js`) is nested inside the React `src` folder. This is an anti-pattern. Create React App's build pipeline expects `src/` to strictly contain frontend code. 
*   **Solution:** Restructure the project to separate concerns. Move the backend out of the `src` folder. A standard approach is:
    ```
    /nivvis
      /client (React app)
      /server (Express app)
      package.json (Root workspace)
    ```

### **Hardcoded API Endpoints & Port Mismatch**
*   **Issue:** In `src/About/about.js`, the fetch request is hardcoded to `http://localhost:5000/send-email`. However, your backend `server.js` is configured to listen on port `8000`. This breaks the contact form locally and will completely fail in production.
*   **Solution:** Use an environment variable for the API base URL (e.g., `process.env.REACT_APP_API_URL`). In development, use a relative path (`/send-email`) by setting a `"proxy": "http://localhost:8000"` in your frontend `package.json`.

---

## 3. Performance (🟡 Medium Priority)

### **Asset Management & Heavy Images**
*   **Issue:** The `src/images/products` folder contains unoptimized, raw images (some exceeding 3MB to 5MB, like `img4.jpg`). Serving these directly will drastically slow down page load times and hurt SEO.
*   **Solution:** 
    *   Compress the images and convert them to modern web formats like WebP or AVIF. 
    *   Implement lazy loading on all images using the native `loading="lazy"` attribute in your `<img>` tags.
    *   Consider using a CDN (Content Delivery Network) for serving media assets in production.

---

## 4. Future Upgrades & Dependency Health (🟢 Nice-to-Have)

### **Migrate Away from Create React App (CRA)**
*   **Issue:** The project uses `react-scripts` (CRA), which is now effectively deprecated by the React team. It uses older, slower bundling tools (Webpack).
*   **Solution:** Migrate the project to a modern, faster build tool like **Vite** or a meta-framework like **Next.js**. Vite will significantly reduce your local startup time and build times.

### **Dependency Cleanup & Dev Tools**
*   **Issue:** The `package.json` lacks standard code-quality enforcement tools, and some dependencies might be dead weight (e.g., `emailjs-com` is installed but likely unused since you built a custom Express backend).
*   **Solution:** 
    *   Uninstall unused packages (`npm uninstall emailjs-com`).
    *   Add **Prettier** for automated code formatting.
    *   Configure **ESLint** strictly for React.
    *   Set up **Husky** and **lint-staged** to ensure code is formatted and linted before every git commit.
