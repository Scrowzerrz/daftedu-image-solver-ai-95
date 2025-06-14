
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { MainFeatures } from "@/components/MainFeatures";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-daft-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-daft-600 border-t-transparent"></div>
          <p className="text-daft-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  // Only render the landing page if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <Hero />
          <Features />
          <MainFeatures />
          <Testimonials />
          <Pricing />
          <CTA />
        </main>
        <Footer />
      </div>
    );
  }

  return null;
};

export default Index;
