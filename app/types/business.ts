export interface Business {
  id: number;
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
  avatar: string;
  instagram?: string;
  kakao?: string;
  contact?: string;
  featured?: boolean;
}
