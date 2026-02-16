import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ProtectedRoute from "./components/admin/protectedroute";
import { SeoHead } from "./components/SeoHead";

const queryClient = new QueryClient();

// ✅ Lazy Imports
const Landing = lazy(() => import("./pages/Landing"));
const About = lazy(() => import("./pages/About"));
const SolarProducts = lazy(() => import("./pages/SolarProducts"));
const EPCCompany = lazy(() => import("./pages/EPCCompany"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Events = lazy(() => import("./pages/Events"));
const Admin = lazy(() => import("./pages/Admin"));
const Auth = lazy(() => import("./pages/Auth"));
const ProjectPreview = lazy(() => import("./pages/ProjectPreview"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SeoHead />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <Routes>
            {/* 🔓 Public Route */}
            <Route path="/auth" element={<Auth />} />

            {/* 🔒 Protected Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/solar-products" element={<SolarProducts />} />
            <Route path="/epc-company" element={<EPCCompany />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/project/:id" element={<ProtectedRoute><ProjectPreview /></ProtectedRoute>} />

            <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
