export interface Business {
  id: number;
  like: number;
  name: string;
  description: string;
  categories: string[];
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
  slug?: string;
  vendorOfWeek?: boolean; // Mark this vendor as vendor of the week
  vendor?: {
    name: string;
    story: string;
    quote?: string;
    journey?: string;
    passion?: string;
    image?: string;
  };
}
