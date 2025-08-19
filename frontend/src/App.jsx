import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import IndexPage from './pages/Index';
import JoinACampaignPage from './pages/JoinACampaign';
import About from './pages/About';
import { SignIn } from '@clerk/clerk-react';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/CreateCampaign';
import OngoingCampaign from './pages/OngoingCampaign';

const App = () => {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/joinacampaign" element={<JoinACampaignPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/campaigns" element={<Campaigns/>} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/campaigns/create" element={<CreateCampaign />} />
      <Route path="/campaigns/ongoing" element={<OngoingCampaign />} />
    </Routes>
    <ToastContainer />
    </>
  );
};

export default App;
