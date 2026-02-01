






'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, X, Upload, Check } from 'lucide-react';
// import { supabase } from '@/lib/supabase';
// import Topbar from '@/components/layout/Topbar';
import Topbar from "@/components/layout/Topbar";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
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

export default function CreateProjectPage({
  children,
}: {  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getCurrentUser();
  }, []);

  const currentSection = formSections[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === formSections.length - 1;

  const handleInputChange = (fieldKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveProject = async () => {
    if (!user) {
      alert('Please log in to save your project');
      return;
    }

    setSaving(true);
    try {
      let newProjectId = projectId;

      if (!projectId) {
        const { data, error } = await supabase
          .from('projects')
          .insert({
            user_id: user.id,
            ...formData,
          })
          .select()
          .single();

        if (error) throw error;
        newProjectId = data.id;
        setProjectId(data.id);
      } else {
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', projectId);

        if (error) throw error;
      }

      if (uploadedFiles.length > 0 && newProjectId) {
        for (const file of uploadedFiles) {
          const fileName = `${newProjectId}/${Date.now()}-${file.name}`;
          const { error: uploadError } = await supabase.storage
            .from('project-documents')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          await supabase
            .from('project_documents')
            .insert({
              project_id: newProjectId,
              file_path: fileName,
              file_name: file.name,
              file_type: file.type,
            });
        }

        setUploadedFiles([]);
      }

      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleRestart = () => {
    if (confirm('Are you sure you want to restart? Unsaved changes will be lost.')) {
      setCurrentStep(0);
      setFormData({});
      setUploadedFiles([]);
      setProjectId(null);
    }
  };

  const handleClose = () => {
    if (confirm('Are you sure you want to close? Make sure to save your work.')) {
      setCurrentStep(0);
      setFormData({});
      setUploadedFiles([]);
      setProjectId(null);
    }
  };

  return (
    <SidebarProvider>
      {/* <Topbar /> */}
                  {/* LEFT (4) */}
                  <aside className="col-span-12 md:col-span-4 bg-white rounded-2xl border p-6 sticky top-6">
                    <div className="space-y-2">
                      {formSections.map((section, index) => (
                        <button
                          key={section.id}
                          onClick={() => setCurrentStep(index)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
                            currentStep === index
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="mr-2 font-semibold">{index + 1}.</span>
                          {section.title}
                        </button>
                      ))}
                    </div>
                  </aside>


      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 items-start">
              {/* right area */}
              <section className="col-span-12 md:col-span-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
                  <div className="flex items-center justify-between mb-8">
                    <button
                      onClick={handleRestart}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition text-slate-600 text-sm font-medium"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restart
                    </button>
                    <button
                      onClick={handleClose}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition text-slate-600 text-sm font-medium"
                    >
                      <X className="w-4 h-4" />
                      Close
                    </button>
                  </div>

                  <h1 className="text-3xl font-bold text-slate-900 mb-8">
                    {currentSection.title}
                  </h1>
                  
                  <div className="space-y-6 mb-8">
                    {currentSection.fields.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 block">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition"
                        />
                      </div>
                    ))}

                    {isLastStep && (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-900 block">
                          Upload documents
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-slate-400 transition cursor-pointer">
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center gap-2 cursor-pointer"
                          >
                            <Upload className="w-5 h-5 text-slate-400" />
                            <span className="text-sm text-slate-600">
                              Click to upload or drag and drop
                            </span>
                            <span className="text-xs text-slate-400">
                              PDF, DOC, DOCX, XLS, XLSX
                            </span>
                          </label>
                        </div>

                        {uploadedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200"
                              >
                                <Check className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-slate-600 flex-1 truncate">
                                  {file.name}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {(file.size / 1024).toFixed(1)}KB
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-8 pb-6 border-t border-slate-200">
                    <div className="flex gap-1 mt-4">
                      {formSections.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 rounded-full transition ${
                            index === currentStep
                              ? 'w-8 bg-slate-900'
                              : index < currentStep
                                ? 'w-2 bg-green-600'
                                : 'w-2 bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 ml-auto">
                      {currentStep + 1} / {formSections.length}
                    </span>
                  </div>

                  <div className="flex gap-3 justify-between">
                    <div className="flex gap-3">
                      <button
                        onClick={handlePrevious}
                        disabled={isFirstStep}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={isLastStep}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={handleSaveProject}
                      disabled={saving}
                      className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Saving...' : 'Save Project'}
                    </button>
                  </div>
                </div>
              </section>

      </div>
    </div>
  </main> 
  </SidebarProvider>
  );
}
