export interface Users {
  sova_id: string;
  journey_id: string;
  program_id: string;
  paid_order_id: string;
  journey_status: string;
  questionnaire_id?: string;
  test_schedule_id?: string;
  biomarker_report_id?: string;
  consultation_schedule_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Profiles {
  account_id: string;
  sova_id: string;
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  referral_code?: string;
  promotion_code?: string;
  created_at?: Date;
  updated_at?: Date;
}
