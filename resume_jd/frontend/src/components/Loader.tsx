'use client';

import React from 'react';
import { useResumeStore } from '../store/useResumeStore';

export default function Loader() {
  const { isLoading, loadingStep, loadingSub } = useResumeStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="w-16 h-16 border-4 border-slate-800 border-t-violet-500 rounded-full animate-spin mb-6" />
      <h3 className="font-title font-semibold text-xl text-white mb-2 tracking-tight">
        {loadingStep || 'Processing...'}
      </h3>
      <p className="text-slate-400 text-sm">
        {loadingSub || 'Please wait a moment while we process your request.'}
      </p>
    </div>
  );
}
