/**
 * Robopulse Intelligence — Main Application Shell & Client Router
 */

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { CursorGlow } from "./components/CursorGlow";
import { AmbientBackground } from "./components/AmbientBackground";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { CoursesPage } from "./pages/CoursesPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { RoboticsPage } from "./pages/RoboticsPage";
import { StemPage } from "./pages/StemPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { ContactPage } from "./pages/ContactPage";
import { ChatPage } from "./pages/ChatPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname || "/";
    }
    return "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case "/":
        return <HomePage navigate={navigate} />;
      case "/about":
        return <AboutPage navigate={navigate} />;
      case "/services":
      case "/solutions":
        return <ServicesPage navigate={navigate} />;
      case "/courses":
        return <CoursesPage navigate={navigate} />;
      case "/robotics":
        return <RoboticsPage navigate={navigate} />;
      case "/stem":
        return <StemPage navigate={navigate} />;
      case "/gallery":
        return <GalleryPage navigate={navigate} />;
      case "/reviews":
        return <ReviewsPage navigate={navigate} />;
      case "/contact":
        return <ContactPage />;
      case "/chat":
      case "/ai-bot":
      case "/ai-assistant":
        return <ChatPage navigate={navigate} />;
      default:
        return <NotFoundPage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col justify-between selection:bg-[#00C9FF]/30 selection:text-[#00C9FF] transition-colors duration-300 relative">
      {/* Dynamic responsive ambient background */}
      <AmbientBackground />

      {/* Subtle desktop cyan glow cursor */}
      <CursorGlow />

      {/* Floating Glass Navigation */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Page Content */}
      <main className="flex-1 w-full relative z-10">{renderCurrentPage()}</main>

      {/* Persistent Floating AI Assistant & Side Message Action */}
      <FloatingWhatsApp navigate={navigate} />

      {/* 4-column Dark Futuristic Footer */}
      <div className="relative z-10">
        <Footer navigate={navigate} />
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}

