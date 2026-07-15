'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useResumeStore } from '../store/useResumeStore';
import { FileText, X } from 'lucide-react';

export default function DashboardView() {
  const {
    resumeName,
    jdText,
    setJdText,
    uploadResumeFile,
    removeResumeFile,
    runOptimization,
    originalResume
  } = useResumeStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadResumeFile(acceptedFiles[0]);
    }
  }, [uploadResumeFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/json': ['.json']
    },
    multiple: false
  });

  const isReady = (resumeName !== '' || originalResume !== null) && jdText.trim().length > 15;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch w-full mb-8">
      {/* Upload Resume Panel */}
      <div className="flex flex-col">
        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-4">
          <span className="text-xl">📄</span> Your resume
        </h3>

        <div className="flex-grow flex flex-col justify-start">
          {!(resumeName || originalResume) ? (
            <div
              {...getRootProps()}
              className={`border border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[220px]
                ${isDragActive ? 'border-cyan-400 bg-cyan-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'}
              `}
            >
              <input {...getInputProps()} />
              <div className="w-12 h-12 bg-[#6eb9f7] rounded-lg flex items-center justify-center text-white mb-4 shadow-sm shadow-blue-200">
                <span className="text-2xl leading-none font-bold">↑</span>
              </div>
              <p className="text-slate-600 text-sm mb-1">
                Click to upload or <strong className="text-slate-800 font-bold">drag and drop</strong>
              </p>
              <p className="text-slate-400 text-xs">
                PDF up to 10MB
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-4 rounded-lg">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-[#e0f2fe] rounded-lg flex items-center justify-center text-[#0284c7]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800 truncate max-w-[220px]">
                    {resumeName || 'resume_final.pdf'}
                  </p>
                  <p className="text-slate-500 text-xs">
                    Ready to analyze
                  </p>
                </div>
              </div>
              <button
                onClick={removeResumeFile}
                className="p-1.5 hover:bg-red-50 hover:text-red-500 text-slate-400 rounded-lg transition-colors cursor-pointer"
                title="Remove File"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Target Job Description Panel */}
      <div className="flex flex-col">
        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-4">
          <span className="text-xl">🎯</span> Target job
        </h3>

        <div className="flex flex-col gap-3 flex-grow h-full">
          {jdText.length > 50 && (
            <div className="self-start px-3 py-1 bg-[#e0f2fe] text-[#0284c7] text-xs font-bold rounded-full mb-1">
              Data Analyst
            </div>
          )}
          <div
            className="flex-grow bg-slate-50 border border-slate-200 p-5 rounded-xl min-h-[220px] flex flex-col focus-within:border-cyan-400 focus-within:shadow-sm"
          >
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste target job description details here... Include required technical skills, experience requirements, and key terms to match."
              className="w-full h-full flex-grow bg-transparent text-slate-700 text-sm leading-relaxed resize-none focus:outline-none scrollbar-thin scrollbar-thumb-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Action Trigger Button (Now just floating or below?) */}
      <div className="col-span-1 lg:col-span-2 flex justify-center mt-4">
        {isReady && (
          <button
            onClick={runOptimization}
            className="px-10 py-3 bg-cyan-600 text-white rounded-lg font-bold text-base shadow hover:bg-cyan-700 transition-colors"
          >
            Run ATS Analysis
          </button>
        )}
      </div>
    </div>
  );
}
