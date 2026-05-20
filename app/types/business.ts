export interface Business {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  tags: string[];
  cover: string;
  avatar: string;
  instagram?: string;
  contact?: string;
  featured?: boolean;
}
