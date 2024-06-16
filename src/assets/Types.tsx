export interface SingularProduct {
  id: number;
  name: string;
  slug: string;
  featured: boolean;
  description: string;
  short_description: string | null;
  price: string;
  categories: any[];
  tags: any[];
  images: any[];
  stock_status: string;
}

export interface User {
  id: number;
  date_created: string;
  email: string;
  first_name: string;
  last_name: string;
  billing: any | null;
  shipping: any | null;
}

export interface BasketItem {
  id: number;
  quantity: number;
}
