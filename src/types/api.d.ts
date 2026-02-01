

export interface TopMenuItem {
  id: number;
  name: string;       
  title: string;   
  url: string;
  position: number;
  is_active: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
