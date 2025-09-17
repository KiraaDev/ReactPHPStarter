export interface Resident {
  resident_id: number;
  first_name: string;
  last_name: string;
  birthdate?: string;
  gender?: "Male" | "Female" | "Other";
  civil_status?: "Single" | "Married" | "Widowed" | "Separated";
  address: string;
  contact_number?: string;
  occupation?: string;
  household_size?: number;
  created_at: string;
}
