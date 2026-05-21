import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import CaseStudies from "./pages/CaseStudies";
import Experience from "./pages/Experience";
import SystemsThinking from "./pages/SystemsThinking";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId" element={<ProjectDetails />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/systems-thinking" element={<SystemsThinking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;