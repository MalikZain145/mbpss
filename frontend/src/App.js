import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Public site
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';

// Admin panel
import { AdminAuthProvider, useAdminAuth } from './admin/context/AdminAuthContext';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import { AdminQuotesList, AdminQuoteDetail } from './admin/pages/AdminQuotes';
import { AdminMessagesList, AdminMessageDetail } from './admin/pages/AdminMessages';
import AdminReviews from './admin/pages/AdminReviews';
import AdminServices from './admin/pages/AdminServices';
import AdminSettings from './admin/pages/AdminSettings';

import './App.css';

function AdminGuard({ children }) {
  const { admin, loading } = useAdminAuth();
  const location = useLocation();
  if (loading) return (
    <div style={{minHeight:'100vh',background:'#0f1117',display:'flex',alignItems:'center',
      justifyContent:'center',color:'#64748b',fontFamily:'DM Sans,sans-serif',fontSize:14}}>
      Loading…
    </div>
  );
  if (!admin) return <Navigate to="/admin/login" state={{ from: location }} replace/>;
  return <AdminLayout>{children}</AdminLayout>;
}

function PublicSite() {
  return (
    <div className="app">
      <Navbar/>
      <main>
        <Routes>
          <Route path="/"               element={<Home/>}/>
          <Route path="/services"       element={<Services/>}/>
          <Route path="/services/:slug" element={<ServiceDetail/>}/>
          <Route path="/about"          element={<About/>}/>
          <Route path="/contact"        element={<Contact/>}/>
          <Route path="/quote"          element={<Quote/>}/>
          <Route path="/terms"          element={<TermsConditions/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
          <Route path="/cookies"        element={<CookiePolicy/>}/>
          <Route path="*"               element={<Home/>}/>
        </Routes>
      </main>
      <Footer/>
      <ChatWidget/>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <Routes>
          {/* Admin routes - no public navbar/footer */}
          <Route path="/admin/login"          element={<AdminLogin/>}/>
          <Route path="/admin"                element={<AdminGuard><AdminDashboard/></AdminGuard>}/>
          <Route path="/admin/quotes"         element={<AdminGuard><AdminQuotesList/></AdminGuard>}/>
          <Route path="/admin/quotes/:id"     element={<AdminGuard><AdminQuoteDetail/></AdminGuard>}/>
          <Route path="/admin/messages"       element={<AdminGuard><AdminMessagesList/></AdminGuard>}/>
          <Route path="/admin/messages/:id"   element={<AdminGuard><AdminMessageDetail/></AdminGuard>}/>
          <Route path="/admin/reviews"        element={<AdminGuard><AdminReviews/></AdminGuard>}/>
          <Route path="/admin/services"       element={<AdminGuard><AdminServices/></AdminGuard>}/>
          <Route path="/admin/settings"       element={<AdminGuard><AdminSettings/></AdminGuard>}/>
          {/* Public site */}
          <Route path="/*"                    element={<PublicSite/>}/>
        </Routes>
      </AdminAuthProvider>
    </Router>
  );
}
