'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Upload, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
// import { supabase } from '@/lib/supabase';

const formSections = [
  {
    id: 1,
    title: 'Concept Overview',
    fields: [
      { key: 'business_name', label: 'Business Name', placeholder: 'Typing Business Name' },
      { key: 'problem_statement', label: 'Problem Statement', placeholder: 'Write about your problem statement here...' },
      { key: 'target_audience', label: 'Target Audience', placeholder: 'Write about your target audience...' },
      { key: 'existing_solutions', label: 'Existing solutions & limitations', placeholder: 'Write about existing solutions...' },
    ],
  },
  {
    id: 2,
    title: 'Founder identity',
    fields: [
      { key: 'business_name', label: 'Business name', placeholder: 'Type business name...' },
      { key: 'founder_role', label: 'Role In Project', placeholder: 'Select a role' },
      { key: 'experience_skills', label: 'Main Experience & Skills', placeholder: 'Select skills' },
    ],
  },
  {
    id: 3,
    title: 'Your Proposed Solution',
    fields: [
      { key: 'solution_description', label: 'Description of solution', placeholder: 'Describe your solution in short...' },
      { key: 'stage', label: 'Stage', placeholder: 'Select type' },
      { key: 'differentiation', label: 'Differentiation from competitors', placeholder: 'Type about this...' },
      { key: 'client_benefits', label: 'Concrete benefits for clients', placeholder: 'Type benefits here...' },
    ],
  },
  {
    id: 4,
    title: 'Market Analysis & Customer insights',
    fields: [
      { key: 'primary_customer_segment', label: 'Primary customer segment', placeholder: 'Type here...' },
      { key: 'geographic_target', label: 'Geographic target', placeholder: 'Type about this...' },
      { key: 'purchasing_behavior', label: 'Customer purchasing behavior', placeholder: 'Type here...' },
      { key: 'market_size', label: 'Estimated market size', placeholder: 'Type size here...' },
    ],
  },
  {
    id: 5,
    title: 'Business Model',
    fields: [
      { key: 'product_type', label: 'Product & Service Type', placeholder: 'Select Product Type' },
      { key: 'planned_price', label: 'Planned price', placeholder: 'Type here...' },
      { key: 'sales_channels', label: 'Sales channels', placeholder: 'About Online/Offline/Vendor...' },
      { key: 'startup_costs', label: 'Startup costs', placeholder: 'Type costs...' },
    ],
  },
  {
    id: 6,
    title: 'Operations & Execution',
    fields: [
      { key: 'startup_requirements', label: 'What is needed to start?', placeholder: 'Like tools, software, skills...' },
      { key: 'prototype_status', label: 'Prototype status', placeholder: 'Select Status' },
      { key: 'main_risks', label: 'Main risks identified', placeholder: 'type here...' },
    ],
  },
  {
    id: 7,
    title: 'Roadmap & Objectives',
    fields: [
      { key: 'goals_30_days', label: '30-Day Goals', placeholder: 'My 30 days goals is...' },
      { key: 'targets_90_days', label: '90-Day targets', placeholder: '90 days targets is...' },
      { key: 'objectives_12_months', label: '12-Month Objectives', placeholder: '12 month objectives...' },
    ],
  },
  {
    id: 8,
    title: 'Risks & Compliance',
    fields: [
      { key: 'regulatory_considerations', label: 'Regulatory considerations', placeholder: 'Type...' },
      { key: 'legal_risks', label: 'Legal / ethical risks', placeholder: 'Type...' },
      { key: 'certifications_licenses', label: 'Required certifications / licenses', placeholder: 'Type...' },
    ],
  },
  {
    id: 9,
    title: 'Equity details, image, and document',
    fields: [
      { key: 'amount_required', label: 'Amount Required', placeholder: '$ 1200.00' },
      { key: 'equity_percentage', label: 'Equity Share Percentage', placeholder: '0.00%' },
    ],
  },
];

export default function CreateProjectPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentSection = formSections[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === formSections.length - 1;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 grid grid-cols-1 lg:grid-cols-3">

      {/* LEFT SIDEBAR (1/3 FIXED) */}
      <aside className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 
        border-r border-slate-200 dark:border-slate-800 
        p-8 h-screen sticky top-0 overflow-y-auto">

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Bring your idea to life.
        </h1>

        <div className="space-y-4">
          {formSections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setCurrentStep(index)}
              className={`w-full text-left transition ${
                currentStep === index
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <div className="flex gap-3">
                <span className="text-sm font-semibold">{index + 1}</span>
                <div>
                  <div className="text-sm font-semibold">{section.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                      {section.id === 1 && "Explain your core concept"}
                      {section.id === 2 && "Introduce the founder"}
                      {section.id === 3 && "Outline your solution"}
                      {section.id === 4 && "Analyze target market"}
                      {section.id === 5 && "Describe revenue model"}
                      {section.id === 6 && "Detail your execution"}
                      {section.id === 7 && "Lay out your timeline"}
                      {section.id === 8 && "Identify potential risks"}
                      {section.id === 9 && "Add equity, image, and docs"}
                    </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* RIGHT CONTENT (2/3) */}
      <main className="lg:col-span-2 p-8 h-screen overflow-y-auto flex justify-center">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 
          rounded-xl border border-slate-200 dark:border-slate-800 
          shadow-sm p-8">

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {currentSection.title}
          </h2>

          <div className="space-y-6">
            {currentSection.fields.map(field => (
              <div key={field.key}>
                <label className="text-sm font-semibold block mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={formData[field.key] || ''}
                  onChange={e =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-lg border 
                    bg-slate-50 dark:bg-slate-800
                    border-slate-200 dark:border-slate-700"
                />
              </div>
            ))}

            {isLastStep && (
              <div>
                <label className="font-semibold block mb-2">
                  Upload documents
                </label>
                <input
                  type="file"
                  multiple
                  onChange={e => e.target.files && setUploadedFiles([...e.target.files])}
                />

                {uploadedFiles.map((f, i) => (
                  <div key={i} className="flex gap-2 mt-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" /> {f.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* NAVIGATION */}
          <div className="flex justify-between mt-8">
            <button
              disabled={isFirstStep}
              onClick={() => setCurrentStep(s => s - 1)}
              className="px-4 py-2 border rounded-lg"
            >
              <ChevronLeft className="inline w-4 h-4" /> Previous
            </button>

            <button
              disabled={isLastStep}
              onClick={() => setCurrentStep(s => s + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Next <ChevronRight className="inline w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
