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
      { key: 'name', label: 'Name', placeholder: 'Typing Project Name' },
      { key: 'problem_statement', label: 'Problem Statement', placeholder: 'Write about your problem statement here...' },
      { key: 'target_audience', label: 'Target Audience', placeholder: 'Write about your target audience...' },
      { key: 'existing_solutions', label: 'Existing solutions & limitations', placeholder: 'Write about existing solutions...' },
    ],
  },
  {
    id: 2,
    title: 'Your Proposed Solution',
    fields: [
      {
        key: 'solution_description',
        label: 'Description of solution',
        placeholder: 'Describe your solution in short...',
        type: 'text',
      },
      {
        key: 'stage',
        label: 'Stage',
        type: 'select',
        options: [
          { label: 'Idea', value: 'idea' },
          { label: 'MVP', value: 'mvp' },
          { label: 'Beta', value: 'beta' },
          { label: 'Live / Launched', value: 'live' },
          { label: 'Scaling', value: 'scaling' },
        ],
      },
      {
        key: 'differentiation',
        label: 'Differentiation from competitors',
        placeholder: 'Type about this...',
        type: 'text',
      },
      {
        key: 'client_benefits',
        label: 'Concrete benefits for clients',
        placeholder: 'Type benefits here...',
        type: 'text',
      },
      {
        key: 'long_term_vision',
        label: 'Long-term vision (3–5 years)',
        placeholder: 'Type your long-term vision here...',
        type: 'text',
      },
    ],
  },
  {
    id: 3,
    title: 'Market Analysis & Customer insights',
    fields: [
      { key: 'primary_customer_segment', label: 'Primary customer segment', placeholder: 'Type here...' },
      { key: 'geographic_target', label: 'Geographic target', placeholder: 'Type Country/Region...' },
      { key: 'purchasing_behavior', label: 'Customer purchasing behavior', placeholder: 'Type here...' },
      { key: 'market_size', label: 'Estimated market size', placeholder: '10M by 2030...' },
    ],
  },
  {
    id: 4,
    title: 'Business Model',
    fields: [
      { key: 'product_type', label: 'Product & Service Type', type: 'select',
        options: [
          { label: 'Product', value: 'product' },
          { label: 'Service', value: 'service' },
          { label: 'Product & Service', value: 'product & service' },
        ],
       },
      { key: 'planned_price', label: 'Planned price', placeholder: 'Type here...' },
      { key: 'sales_channels', label: 'Sales channels', placeholder: 'About Online/Offline/Vendor...' },
      { key: 'startup_costs', label: 'Startup costs', placeholder: 'Type costs...' },
      { key: '12_months_revenue_target', label: '12-Month Revenue Target', placeholder: 'Type revenue target...' },
    ],
  },
  {
    id: 5,
    title: 'Operations & Execution',
    fields: [
      { key: 'startup_requirements', label: 'What is needed to start?', placeholder: 'Like tools, software, skills...' },
      { key: 'prototype_status', label: 'Prototype status', type: 'select',
        options: [
          { label: 'I Have', value: 'I Have' },
          { label: 'Haven’t', value: 'Haven’t' },
        ], 
      },
      { key: 'main_risks', label: 'Main risks identified', placeholder: 'type here...' },
    ],
  },
  {
    id: 6,
    title: 'Roadmap & Objectives',
    fields: [
      { key: 'goals_30_days', label: '30-Day Goals', placeholder: 'My 30 days goals is...' },
      { key: 'targets_90_days', label: '90-Day targets', placeholder: '90 days targets is...' },
      { key: 'objectives_12_months', label: '12-Month Objectives', placeholder: '12 month objectives...' },
    ],
  },
  {
    id: 7,
    title: 'Risks & Compliance',
    fields: [
      { key: 'regulatory_considerations', label: 'Regulatory considerations', placeholder: 'Type...' },
      { key: 'legal_risks', label: 'Legal / ethical risks', placeholder: 'Type...' },
      { key: 'certifications_licenses', label: 'Required certifications / licenses', placeholder: 'Type...' },
    ],
  },
  {
    id: 8,
    title: 'Founder identity',
    fields: [
      { key: 'business_name', label: 'Business name', placeholder: 'Type business name...' },
      { key: 'founder_role', label: 'Role In Project', placeholder: 'Type a role' },
      { key: 'experience_skills', label: 'Main Experience & Skills', placeholder: 'Select skills' },
      { key: 'Prior_Project_Experience', label: 'Prior Project Experience',},
      { key: 'Weekly_Time_Available', label: 'Weekly Time Available', type: 'select',
        options: [
          { label: '< 5 hours', value: 'less_than_5_hours' },
          { label: '5-10 hours', value: '5_to_10_hours' },
          { label: '10-20 hours', value: '10_to_20_hours' },
          { label: '20+ hours', value: 'more_than_20_hours' },
        ], 
      },
      { key: 'Motivation_Vision_Statement', label: 'Motivation / Vision Statement', placeholder: 'Type your motivation/vision here...' },
    ],
  },
  {
    id: 9,
    title: 'Equity details, image, and document',
    fields: [
      { key: 'amount_required', label: 'Amount Required', placeholder: '$ 1200.00' },
      { key: 'equity_percentage', label: 'Equity Share Percentage', placeholder: '0.00%' },
      // { key: 'uploaded_images', label: 'Uploaded Images or Videos', type: 'file', multiple: true },
      // { key: 'uploaded_files', label: 'Uploaded Files', type: 'file', multiple: true },
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
                      {section.id === 2 && "Outline your solution"}
                      {section.id === 3 && "Analyze target market"}
                      {section.id === 4 && "Describe revenue model"}
                      {section.id === 5 && "Detail your execution"}
                      {section.id === 6 && "Lay out your timeline"}
                      {section.id === 7 && "Identify potential risks"}
                      {section.id === 8 && "Introduce the founder"}
                      {section.id === 9 && "Add equity, image, and docs"}
                    </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* RIGHT CONTENT (2/3) */}
      <main className="lg:col-span-2 p-8 h-screen bg-white dark:bg-slate-900 overflow-y-auto flex justify-center">
        <div className="w-full max-w-4xl p-8">

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {currentSection.title}
          </h2>

          <div className="space-y-6">
            {currentSection.fields.map(field => (
              <div key={field.key}>
                <label className="text-sm font-semibold block mb-1">
                  {field.label}
                </label>

                {field.type === 'select' ? (
                  <select
                    value={formData[field.key] || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="rounded-lg border border-slate-300 dark:border-slate-700
                              bg-white dark:bg-slate-900 px-4 py-2 text-sm
                              focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select stage</option>

                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={formData[field.key] || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700
                              bg-white dark:bg-slate-900 px-4 py-2 text-sm
                              focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
            ))}

            {isLastStep && (
              <div>
                <label className="font-semibold block mb-2">
                  Upload documents
                </label>
                <input className="border border-slate-300 dark:border-slate-700
                  rounded-lg px-4 py-2 text-sm w-full
                  bg-white dark:bg-slate-900
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  cursor-pointer"
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
          <div className="flex gap-4 mt-4 justify-between mt-8 py-5">
            <button
              disabled={isFirstStep}
              onClick={() => setCurrentStep(s => s - 1)}
              className="px-4 py-2 border rounded-lg border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center"
            >
              <ChevronLeft className="inline w-4 h-4" /> Previous
            </button>

            <button
              disabled={isLastStep}
              onClick={() => setCurrentStep(s => s + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md flex items-center"
            >
              Next <ChevronRight className="inline w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
