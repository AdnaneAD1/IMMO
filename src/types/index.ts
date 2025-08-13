export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    type: PropertyType;
    category: PropertyCategory;
    location: Location;
    features: PropertyFeatures;
    images: string[];
    agent: Agent;
    isPremium: boolean;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
    views: number;
    favorites: number;
}

export interface Agent {
    id: string;
    name: string;
    type: 'agency' | 'individual';
    email: string;
    phone: string;
    avatar?: string;
    company?: string;
    rating: number;
    reviewsCount: number;
    verified: boolean;
}

export interface Location {
    address: string;
    city: string;
    region: string;
    postalCode: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

export interface PropertyFeatures {
    surface: number; // m²
    rooms: number;
    bedrooms: number;
    bathrooms: number;
    floor?: number;
    totalFloors?: number;
    yearBuilt?: number;
    parking?: boolean;
    garden?: boolean;
    balcony?: boolean;
    elevator?: boolean;
    energyClass?: string;
}

export type PropertyType = 'sale' | 'rent';
export type PropertyCategory =
    | 'apartment'
    | 'house'
    | 'villa'
    | 'studio'
    | 'office'
    | 'commercial'
    | 'land';

export interface SearchFilters {
    type?: PropertyType;
    category?: PropertyCategory;
    priceMin?: number;
    priceMax?: number;
    surfaceMin?: number;
    surfaceMax?: number;
    rooms?: number;
    bedrooms?: number;
    location?: string;
    features?: Partial<PropertyFeatures>;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    propertyId: string;
    content: string;
    createdAt: Date;
    read: boolean;
}

export interface Conversation {
    id: string;
    participants: Agent[];
    property: Property;
    messages: Message[];
    lastMessage: Message;
    updatedAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    type: 'buyer' | 'seller' | 'agent';
    preferences?: SearchFilters;
    favorites: string[]; // Property IDs
}
