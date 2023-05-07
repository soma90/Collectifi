import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import PageLayout from './components/PageLayout';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import Community from './pages/CommunityPage';
import DrawCardPage from './pages/DrawCardPage';
import UpgradeCardPage from './pages/UpgradeCardPage';
import StakingPage from './pages/StakingPage';
import SwapPage from './pages/SwapPage';
import MarketPage from './pages/MarketPage';
import WinPage from './pages/WinPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';
import CardDetailPage from './pages/CardDetailPage';
import UserPage from './pages/UserPage';
import SliderTest from './pages/SliderTest';
import Event from './pages/Event';
import EditPage from './pages/EditPage';
import SliderTest2 from './pages/SliderTest2';
import Donation from './pages/Donation';
import GalleryPage from './pages/GalleryPage';
import GalleryDetailPage from './pages/GalleryDetailPage';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin/Admin';
import WinTest from './pages/WinTest';
import PoolPage from './pages/PoolPage';

const Router: React.FC<{toggle: () => void}> = props => {
  return (
    <Routes>
      <Route element={<PageLayout toggle={props.toggle} />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/draw" element={<DrawCardPage />} />
        <Route path="/upgrade" element={<UpgradeCardPage />} />
        {/* <Route path="/staking" element={<StakingPage />} /> */}
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/pool" element={<PoolPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/market/:id" element={<CardDetailPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/win" element={<WinPage />} />
        <Route path="/community/*" element={<Community />} />
        <Route path="/event/*" element={<Event />} />
        <Route path="/donation/*" element={<Donation />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:id" element={<GalleryDetailPage />} />
      </Route>
      <Route path="/write" element={<WritePage />} />
      <Route path="/edit" element={<EditPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/slidertest" element={<SliderTest2 />} />
      <Route path="/admin/" element={<Admin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/wintest" element={<WinTest />} />
    </Routes>
  );
};

export default Router;
