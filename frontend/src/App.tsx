import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import TripPlannerPage from './pages/TripPlannerPage';
import BudgetCalculatorPage from './pages/BudgetCalculatorPage';
import BlogPage from './pages/BlogPage';
import SeasonGuidePage from './pages/SeasonGuidePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:id" element={<DestinationDetailPage />} />
            <Route path="/trip-planner" element={<TripPlannerPage />} />
            <Route path="/budget-calculator" element={<BudgetCalculatorPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/season-guide" element={<SeasonGuidePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;