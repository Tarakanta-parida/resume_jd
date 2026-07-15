'use client';

import React, { useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { BarChart2, Target, Key } from 'lucide-react';

export default function AnalysisView() {
  const {
    originalScore,
    optimizedScore,
    matchedKeywords,
    missingKeywords
  } = useResumeStore();

  const [activeTab, setActiveTab] = useState<'missing' | 'matched'>('missing');

  const diff = optimizedScore - originalScore;
  const currentKeywordsList = activeTab === 'missing' ? missingKeywords : matchedKeywords;

  const categories = [
    { name: 'Keywords', current: originalScore + 5, potential: Math.min(originalScore + 25, 98) },
    { name: 'Skills match', current: Math.max(originalScore - 10, 45), potential: Math.min(originalScore + 10, 95) },
    { name: 'Experience', current: originalScore + 2, potential: Math.min(originalScore + 22, 98) },
    { name: 'Education', current: 95, potential: 98 }
  ];

  return (
    <div className="flex flex-col gap-6 w-full mb-8">
      
      {/* Top Banner & Score */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
        <div className="flex flex-col gap-3 w-full md:w-3/4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#ecfdf5] border border-[#a7f3d0] text-[#059669] text-sm font-semibold rounded-full self-start">
            ✓ +{diff}% improvement potential
          </div>
          <div className="bg-[#ecfdf5] border border-[#a7f3d0] p-4 rounded-lg text-[#065f46] text-sm">
            <strong>{missingKeywords.length} critical gaps found.</strong> By adding missing keywords and optimizing language, you can reach {optimizedScore}% match score.
          </div>
        </div>
        
        {/* Current Score Box positioned top right as in screenshot */}
        <div className="hidden md:flex flex-col items-center justify-center bg-[#f0f9fa] border border-[#d6eef1] rounded-lg p-4 min-w-[140px] absolute right-8 top-[130px]">
          <span className="text-[#0284c7] text-xs font-bold tracking-wider mb-1">CURRENT SCORE</span>
          <span className="text-[#0284c7] font-bold text-4xl">{originalScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full mt-2">
        {/* Score Verdict Card */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <BarChart2 className="w-5 h-5 text-slate-500" />
            <h3 className="font-bold text-base text-slate-800">
              Match verdict
            </h3>
          </div>

          <div className="flex justify-around items-center w-full flex-grow pb-4">
            <div className="flex flex-col items-center gap-3">
              <div className="w-32 h-32 rounded-full bg-[#ffe4e6] flex items-center justify-center">
                <span className="text-4xl font-bold text-[#be123c]">{originalScore}%</span>
              </div>
              <span className="text-sm text-slate-500 font-medium">Current</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-32 h-32 rounded-full bg-[#ecfdf5] flex items-center justify-center">
                <span className="text-4xl font-bold text-[#047857]">{optimizedScore}%</span>
              </div>
              <span className="text-sm text-slate-500 font-medium">Potential</span>
            </div>
          </div>
        </div>

        {/* Section Progress Bars Card */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-red-400" />
            <h3 className="font-bold text-base text-slate-800">
              Alignment breakdown
            </h3>
          </div>

          <div className="flex flex-col gap-5">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-600">{cat.name}</span>
                  <span className="text-slate-500 text-xs">{cat.current}% → {cat.potential}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#0ea5e9] rounded-full transition-all duration-1000"
                    style={{ width: `${cat.potential}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords Badge Panel */}
        <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col mt-2">
          <div className="flex items-center gap-2 mb-6">
            <Key className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold text-base text-slate-800">
              Keyword analysis
            </h3>
          </div>

          <div className="flex gap-6 border-b border-slate-100 mb-6">
            <button
              onClick={() => setActiveTab('missing')}
              className={`pb-3 text-sm font-bold transition-all duration-200 cursor-pointer border-b-2
                ${activeTab === 'missing'
                  ? 'border-slate-800 text-slate-800'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
                }
              `}
            >
              Missing ({missingKeywords.length})
            </button>
            <button
              onClick={() => setActiveTab('matched')}
              className={`pb-3 text-sm font-bold transition-all duration-200 cursor-pointer border-b-2
                ${activeTab === 'matched'
                  ? 'border-slate-800 text-slate-800'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
                }
              `}
            >
              Matched ({matchedKeywords.length})
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {currentKeywordsList.length === 0 ? (
              <p className="text-slate-500 text-sm italic py-2">No keywords in this category.</p>
            ) : (
              currentKeywordsList.map((kw, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center px-4 py-2 rounded text-xs font-bold uppercase tracking-wider
                    ${activeTab === 'missing'
                      ? 'bg-[#fee2e2] text-[#b91c1c]'
                      : 'bg-[#dcfce7] text-[#15803d]'
                    }
                  `}
                >
                  {kw}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
