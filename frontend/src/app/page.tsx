'use client';

import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import Loader from '../components/Loader';
import DashboardView from '../components/DashboardView';
import AnalysisView from '../components/AnalysisView';
import ComparerView from '../components/ComparerView';
import ReportView from '../components/ReportView';

export default function Home() {
  const { 
    currentTab, 
    loadSampleProfile,
    setCurrentTab
  } = useResumeStore();

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return {
          title: 'Optimize your resume',
          sub: 'Upload your resume and target job description to get keyword-matched recommendations'
        };
      case 'analysis':
        return {
          title: 'Your analysis',
          sub: 'Detailed keyword matching & ATS compatibility check'
        };
      case 'comparer':
        return {
          title: 'Before & after comparison',
          sub: 'See exactly how your resume was optimized to match job requirements'
        };
      case 'report':
        return {
          title: 'ATS audit report',
          sub: 'Detailed compatibility analysis and actionable recommendations'
        };
      default:
        return {
          title: 'Optimize your resume',
          sub: 'Upload your resume and target job description to get keyword-matched recommendations'
        };
    }
  };

  const pageMeta = getPageTitle();

  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-slate-900 font-sans">
      {/* Top Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
          <div className="w-6 h-6 bg-[#0097b2] rounded flex items-center justify-center shrink-0"></div>
          <span className="font-bold text-xl text-[#0097b2] tracking-tight">ResuMatch</span>
        </div>
        
        <div className="flex items-center gap-3 bg-[#f0f9fa] border border-[#d6eef1] px-4 py-2 rounded-lg shrink-0">
          <span className="text-sm font-semibold text-[#00829a] flex items-center gap-2">
            📄 Template Profile:
          </span>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => loadSampleProfile(e.target.value)}
            className="bg-slate-800 border-none text-white rounded px-3 py-1.5 text-sm font-semibold focus:outline-none cursor-pointer"
          >
            <option value="">-- Custom Upload --</option>
            <option value="software_engineer">Software Engineer</option>
            <option value="data_analyst">Data Analyst</option>
            <option value="product_manager">Product Manager</option>
            <option value="marketing_specialist">Marketing Specialist</option>
          </select>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-6xl mx-auto w-full p-8 flex flex-col">
        {/* Page Title Header */}
        <div className="mb-10 w-full">
          <h1 className="font-bold text-[32px] text-slate-900 mb-2">
            {pageMeta.title}
          </h1>
          <p className="text-slate-500 text-[15px]">
            {pageMeta.sub}
          </p>
        </div>

        {/* Render Active Tab Views */}
        <div className="flex-grow flex flex-col">
          {currentTab === 'dashboard' && <DashboardView />}
          {currentTab === 'analysis' && <AnalysisView />}
          {currentTab === 'comparer' && <ComparerView />}
          {currentTab === 'report' && <ReportView />}
        </div>
        
        {/* Navigation Arrows for single-page feel */}
        {currentTab !== 'report' && (
          <div className="flex justify-center mt-12 mb-8">
            <button 
              onClick={() => {
                const tabs: any[] = ['dashboard', 'analysis', 'comparer', 'report'];
                const nextIdx = tabs.indexOf(currentTab) + 1;
                if (nextIdx < tabs.length) setCurrentTab(tabs[nextIdx]);
              }}
              className="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
            >
              ↓
            </button>
          </div>
        )}
      </main>

      {/* Global Fullscreen Processing Loader */}
      <Loader />
    </div>
  );
}
