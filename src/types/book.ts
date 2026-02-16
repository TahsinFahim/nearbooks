import { Category, SubCategory } from "./category"

export interface Publisher {
  id: number
  name: string
  slug: string
  email: string
  phone: string
  address: string
  website: string
  logo: string
  description: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Author {
  id: number;
  name: string | null;
  slug: string | null;
  email: string | null;
  phone: string | null;
  nationality: string | null;
  date_of_birth: string | null;
  photo: string | null;
  short_bio: string | null;
  biography: string | null;
  is_active: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}


export interface Book {
  id: number
  title: string
  slug: string
  author_id: number
  isbn: string
  price: number
  discount_parcentage: number | null
  stock: number
  cover_image: string
  short_description: string
  description: string
  publication_date: string

  publisher_id: number | null
  publisher: Publisher | null  

  is_active: number
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
  category_id: number
  sub_category_id: number
  author: Author
  category: Category
  sub_category: SubCategory
  pdf_price: number | null
}

export interface BooksApiResponse {
  success: boolean
  data: Book[]
}

export interface BookApiResponse {
  success: boolean
  data: Book
}
