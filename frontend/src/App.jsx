import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from './pages/Index';
import JoinACampaignPage from './pages/JoinACampaign';
import About from './pages/About';
import {SignIn} from '@clerk/clerk-react';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
           <Route path="/" element={<IndexPage />} />
           <Route path="/joinacampaign" element={<JoinACampaignPage />} />
           <Route path="/about" element={<About />} />
           <Route path="/login" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
