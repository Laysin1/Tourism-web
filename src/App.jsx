import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import DestinationDetailsPage from "./components/DestinationDetailsPage";
import PageNavigation from "./components/PageNavigation";
import DirectLinks from "./components/DirectLinks";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/destinations/:id"
              element={<DestinationDetailsPage />}
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <PageNavigation />
          <DirectLinks />
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
