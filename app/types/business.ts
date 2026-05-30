export interface Business {
  id: number;
  like: number;
  name: string;
  description: string;
  category: string;
  location: string;
  tags: string[];
  cover: string;
  images?: string[];
  gallery?: string[];
  hours?: string;
  website?: string;
  instagram?: string;
  kakao?: string;
  email?: string;
  phone?: string;
  featured?: boolean;
  isPlaceholder: boolean;
  funFact?: string;
}
