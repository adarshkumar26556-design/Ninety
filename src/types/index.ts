// Property Types
export interface Room {
  _id?: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  bedType: string;
  images: string[];
  amenities: string[];
}

export interface PropertyLocation {
  destination: string;
  city: string;
  state: string;
  country: string;
}

export type PropertyBrand = 'Vilstay' | 'Vilstay Go' | 'Vilstay Venue';
export type PropertyType = 'Resort' | 'Villa' | 'Hotel' | 'Boutique Stay' | 'Homestay' | 'Wedding Venue' | 'Event Space';
export type PropertyStatus = 'active' | 'draft' | 'inactive';

export interface Property {
  _id: string;
  name: string;
  slug: string;
  brand: PropertyBrand;
  propertyType: PropertyType;
  location: PropertyLocation;
  shortDescription: string;
  description: string;
  images: string[];
  startingPrice: number;
  rating: number;
  guests: number;
  roomsCount: number;
  amenities: string[];
  whatsappNumber: string;
  googleMapsUrl: string;
  featured: boolean;
  status: PropertyStatus;
  rooms: Room[];
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    email: string;
    role: string;
  };
}

// Filter types
export interface PropertyFilters {
  brand?: PropertyBrand | '';
  destination?: string;
  propertyType?: PropertyType | '';
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  featured?: boolean;
  status?: PropertyStatus;
  search?: string;
}
