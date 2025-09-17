export interface User {
  user_id: number;       
  resident_id?: number | null; 
  email: string;
  password: string;    
  role: "Admin" | "Official" | "Resident";
  created_at: string;  
  updated_at: string;      
}