export interface Banner {
  id: number;
  title: string;
  subtitle: string | null;
  link: string | null;
  image_path: string;
  is_active: number; // 1 = active, 0 = inactive
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
export interface BannerApiResponse {
  success: boolean;
  data: Banner[];
}
