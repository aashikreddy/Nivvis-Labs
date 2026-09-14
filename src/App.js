// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavigationBar from "./Home/nav";
import Home from "./Home/home";
import Products from "./Products/product";
import About from "./About/about";
import Footer from "./Home/footer";
import Productdetails from "./Products/productdetails";
import NotFound from "./components/NotFound";

// Scroll restoration: jump to top on route change, or scroll to hash target.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the DOM a tick to render before querying the target element.
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: "start" });
      } else {
        // Target not yet in DOM — wait one frame and retry once.
        const raf = requestAnimationFrame(() => {
          const elRetry = document.getElementById(id);
          if (elRetry) {
            elRetry.scrollIntoView({ behavior: "instant", block: "start" });
          }
        });
        return () => cancelAnimationFrame(raf);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ScrollToTop />
    <NavigationBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:productName" element={<Productdetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
