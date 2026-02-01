export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  is_active: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: number;
  sub_categories: SubCategory[];
}

export interface CategoryApiResponse {
  success: boolean;
  data: Category[];
}
