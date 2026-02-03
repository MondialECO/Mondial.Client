// types/creator/create-idea-model.ts

export interface CreateIdeaModel {
  id?: string | null;

  // ===== Concept Overview =====
  name: string;
  problem_statement: string;
  target_audience: string;
  existing_solutions: string;

  // ===== Proposed Solution =====
  solution_description: string;
  stage: 'idea' | 'mvp' | 'beta' | 'live' | 'scaling';
  differentiation: string;
  client_benefits: string;
  long_term_vision: string;

  // ===== Market Analysis =====
  primary_customer_segment: string;
  geographic_target: string;
  purchasing_behavior: string;
  market_size: string;

  // ===== Business Model =====
  product_type: 'product' | 'service' | 'product & service';
  planned_price: string;
  sales_channels: string;
  startup_costs: string;
  revenue_12_months: string;

  // ===== Operations =====
  startup_requirements: string;
  prototype_status: 'I Have' | 'Haven’t';
  main_risks: string;

  // ===== Roadmap =====
  goals_30_days: string;
  targets_90_days: string;
  objectives_12_months: string;

  // ===== Risks & Compliance =====
  regulatory_considerations: string;
  legal_risks: string;
  certifications_licenses: string;

  // ===== Founder =====
  business_name: string;
  founder_role: string;
  experience_skills: string;
  prior_project_experience: string;
  weekly_time_available:
    | 'less_than_5_hours'
    | '5_to_10_hours'
    | '10_to_20_hours'
    | 'more_than_20_hours';
  motivation_vision_statement: string;

  // ===== Equity =====
  amount_required: number;
  equity_percentage: number;

  // ===== Media & Docs =====
  media: File[];      // images + videos
  documents: File[];  // pdf, docx, ppt
  status?: 'DRAFT' | 'SUBMITTED';

}
