'use client';

import React from 'react';
import { useResumeStore } from '../store/useResumeStore';

export default function ComparerView() {
  const { originalResume, optimizedResume } = useResumeStore();

  if (!originalResume || !optimizedResume) {
    return (
      <div className="flex justify-center p-10 text-slate-500">
        No resume data available to compare.
      </div>
    );
  }

  // Component to render a resume panel (either original or optimized)
  const ResumePanel = ({ data, isOptimized, title }: { data: any, isOptimized: boolean, title: string }) => {
    // Helper to safely strip HTML tags if we are rendering the original text
    const cleanText = (htmlStr: string) => {
      if (isOptimized) return htmlStr;
      return htmlStr ? htmlStr.replace(/<[^>]*>/g, '') : '';
    };

    return (
      <div className="flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden resume-content">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h3 className="font-bold text-slate-700 text-sm">{title}</h3>
        </div>
        
        <div className="p-6 flex flex-col gap-6">
          {/* Header section */}
          <div>
            <h1 className="font-bold text-xl text-slate-800 uppercase tracking-wide">
              {data.personalInfo?.name || 'TARAKANTA PARIDA'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Data Analyst | Power BI, SQL, {isOptimized ? 'Python, Tableau' : 'Excel'}
            </p>
          </div>

          {/* Career Objective */}
          {data.summary && (
            <div className="border-t border-slate-100 pt-5">
              <h4 className="text-slate-700 font-semibold text-sm mb-3">Career objective</h4>
              <p 
                className="text-slate-600 text-sm leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ __html: cleanText(data.summary) }}
              />
            </div>
          )}

          {/* Technical Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="border-t border-slate-100 pt-5">
              <h4 className="text-slate-700 font-semibold text-sm mb-3">Technical Skills</h4>
              <div className="flex flex-wrap gap-2.5">
                {data.skills.map((skill: string, idx: number) => {
                  const isAdded = skill.includes('<mark class="add"');
                  const text = skill.replace(/<[^>]*>/g, '').trim();
                  
                  if (!text) return null;

                  return (
                    <span 
                      key={idx}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border
                        ${isOptimized && isAdded 
                          ? 'bg-[#dcfce7] border-[#bbf7d0] text-[#166534]' 
                          : 'bg-white border-slate-200 text-slate-600'
                        }
                      `}
                    >
                      {text}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="border-t border-slate-100 pt-5">
              <h4 className="text-slate-700 font-semibold text-sm mb-4">Work Experience</h4>
              <div className="flex flex-col gap-6">
                {data.experience.map((exp: any, i: number) => (
                  <div key={i}>
                    <h5 className="font-bold text-slate-800 text-sm">{exp.role}</h5>
                    <p className="text-slate-500 text-xs mb-3">
                      {exp.company} | {exp.duration}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {exp.bullets?.map((b: string, idx: number) => (
                        <li key={idx} className="text-slate-600 text-sm leading-relaxed text-justify">
                          <span dangerouslySetInnerHTML={{ __html: cleanText(b) }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Injecting CSS to style the <mark> tags returned by the backend */}
      <style>{`
        .resume-content mark.add,
        .resume-content mark.mod {
          background-color: #fef08a !important; /* Tailwind yellow-200 */
          font-weight: 700;
          color: #1e293b; /* Tailwind slate-800 */
          border-radius: 2px;
          padding: 0 2px;
        }
      `}</style>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-8">
        <ResumePanel data={originalResume} isOptimized={false} title="Original resume" />
        <ResumePanel data={optimizedResume} isOptimized={true} title="Optimized resume" />
      </div>
    </>
  );
}
