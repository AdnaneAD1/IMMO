import { Property, Agent, SearchFilters } from '@/types';

// Données mockées pour les agents
export const mockAgents: Agent[] = [
    {
        id: '1',
        name: 'Sophie Martin',
        type: 'agency',
        email: 'sophie@immobilier-plus.fr',
        phone: '01 23 45 67 89',
        company: 'Immobilier Plus',
        rating: 4.8,
        reviewsCount: 127,
        verified: true,
        avatar: '/api/placeholder/150/150'
    },
    {
        id: '2',
        name: 'Jean Dupont',
        type: 'individual',
        email: 'jean.dupont@email.fr',
        phone: '06 12 34 56 78',
        rating: 4.2,
        reviewsCount: 23,
        verified: true,
        avatar: '/api/placeholder/150/150'
    },
    {
        id: '3',
        name: 'Agence Centrale',
        type: 'agency',
        email: 'contact@agence-centrale.fr',
        phone: '01 98 76 54 32',
        company: 'Agence Centrale',
        rating: 4.6,
        reviewsCount: 89,
        verified: true,
        avatar: '/api/placeholder/150/150'
    }
];

// Données mockées pour les propriétés
export const mockProperties: Property[] = [
    {
        id: '1',
        title: 'Appartement T3 lumineux avec balcon',
        description: 'Magnifique appartement de 75m² situé au 3ème étage avec ascenseur. Exposition sud, très lumineux avec un grand balcon donnant sur un parc. Cuisine équipée, parquet dans toutes les pièces.',
        price: 285000,
        type: 'sale',
        category: 'apartment',
        location: {
            address: '15 rue de la République',
            city: 'Lyon',
            region: 'Rhône-Alpes',
            postalCode: '69002',
            coordinates: { lat: 45.7578, lng: 4.8320 }
        },
        features: {
            surface: 75,
            rooms: 3,
            bedrooms: 2,
            bathrooms: 1,
            floor: 3,
            totalFloors: 5,
            yearBuilt: 1995,
            parking: true,
            balcony: true,
            elevator: true,
            energyClass: 'C'
        },
        images: [
            '/api/placeholder/800/600',
            '/api/placeholder/800/600',
            '/api/placeholder/800/600',
            '/api/placeholder/800/600'
        ],
        agent: mockAgents[0],
        isPremium: true,
        isAvailable: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
        views: 234,
        favorites: 12
    },
    {
        id: '2',
        title: 'Maison individuelle avec jardin',
        description: 'Belle maison de 120m² avec jardin de 400m². 4 chambres, cuisine ouverte sur salon, garage. Quartier résidentiel calme, proche des commodités.',
        price: 450000,
        type: 'sale',
        category: 'house',
        location: {
            address: '8 impasse des Roses',
            city: 'Toulouse',
            region: 'Occitanie',
            postalCode: '31200',
            coordinates: { lat: 43.6047, lng: 1.4442 }
        },
        features: {
            surface: 120,
            rooms: 5,
            bedrooms: 4,
            bathrooms: 2,
            yearBuilt: 2010,
            parking: true,
            garden: true,
            energyClass: 'B'
        },
        images: [
            '/api/placeholder/800/600',
            '/api/placeholder/800/600',
            '/api/placeholder/800/600'
        ],
        agent: mockAgents[1],
        isPremium: false,
        isAvailable: true,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18'),
        views: 156,
        favorites: 8
    },
    {
        id: '3',
        title: 'Studio meublé centre-ville',
        description: 'Studio de 25m² entièrement meublé et équipé. Idéal étudiant ou jeune actif. Proche transport, commerces et universités.',
        price: 650,
        type: 'rent',
        category: 'studio',
        location: {
            address: '22 avenue Jean Jaurès',
            city: 'Montpellier',
            region: 'Occitanie',
            postalCode: '34000',
            coordinates: { lat: 43.6110, lng: 3.8767 }
        },
        features: {
            surface: 25,
            rooms: 1,
            bedrooms: 0,
            bathrooms: 1,
            floor: 2,
            totalFloors: 4,
            yearBuilt: 2005,
            elevator: false,
            energyClass: 'D'
        },
        images: [
            '/api/placeholder/800/600',
            '/api/placeholder/800/600'
        ],
        agent: mockAgents[2],
        isPremium: true,
        isAvailable: true,
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-19'),
        views: 89,
        favorites: 5
    },
    {
        id: '4',
        title: 'Villa moderne avec piscine',
        description: 'Splendide villa contemporaine de 200m² avec piscine chauffée. 5 chambres, bureau, double garage. Vue dégagée sur les montagnes.',
        price: 850000,
        type: 'sale',
        category: 'villa',
        location: {
            address: '45 chemin des Oliviers',
            city: 'Nice',
            region: 'Provence-Alpes-Côte d\'Azur',
            postalCode: '06200',
            coordinates: { lat: 43.7102, lng: 7.2620 }
        },
        features: {
            surface: 200,
            rooms: 7,
            bedrooms: 5,
            bathrooms: 3,
            yearBuilt: 2018,
            parking: true,
            garden: true,
            energyClass: 'A'
        },
        images: [
            '/api/placeholder/800/600',
            '/api/placeholder/800/600',
            '/api/placeholder/800/600',
            '/api/placeholder/800/600',
            '/api/placeholder/800/600'
        ],
        agent: mockAgents[0],
        isPremium: true,
        isAvailable: true,
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-22'),
        views: 567,
        favorites: 34
    },
    {
        id: '5',
        title: 'Appartement T2 rénové',
        description: 'Appartement T2 de 50m² entièrement rénové. Cuisine équipée, salle de bain moderne. Proche métro et commerces.',
        price: 1200,
        type: 'rent',
        category: 'apartment',
        location: {
            address: '12 boulevard Voltaire',
            city: 'Paris',
            region: 'Île-de-France',
            postalCode: '75011',
            coordinates: { lat: 48.8566, lng: 2.3522 }
        },
        features: {
            surface: 50,
            rooms: 2,
            bedrooms: 1,
            bathrooms: 1,
            floor: 4,
            totalFloors: 6,
            yearBuilt: 1900,
            elevator: true,
            energyClass: 'C'
        },
        images: [
            '/api/placeholder/800/600',
            '/api/placeholder/800/600',
            '/api/placeholder/800/600'
        ],
        agent: mockAgents[1],
        isPremium: false,
        isAvailable: true,
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-21'),
        views: 312,
        favorites: 18
    }
];

export class PropertyService {
    private static properties: Property[] = [...mockProperties];

    static async getProperties(filters?: SearchFilters): Promise<Property[]> {
        // Simulation d'une requête API
        await new Promise(resolve => setTimeout(resolve, 500));

        let filteredProperties = [...this.properties];

        if (filters) {
            if (filters.type) {
                filteredProperties = filteredProperties.filter(p => p.type === filters.type);
            }
            if (filters.category) {
                filteredProperties = filteredProperties.filter(p => p.category === filters.category);
            }
            if (filters.priceMin) {
                filteredProperties = filteredProperties.filter(p => p.price >= filters.priceMin!);
            }
            if (filters.priceMax) {
                filteredProperties = filteredProperties.filter(p => p.price <= filters.priceMax!);
            }
            if (filters.surfaceMin) {
                filteredProperties = filteredProperties.filter(p => p.features.surface >= filters.surfaceMin!);
            }
            if (filters.surfaceMax) {
                filteredProperties = filteredProperties.filter(p => p.features.surface <= filters.surfaceMax!);
            }
            if (filters.rooms) {
                filteredProperties = filteredProperties.filter(p => p.features.rooms >= filters.rooms!);
            }
            if (filters.bedrooms) {
                filteredProperties = filteredProperties.filter(p => p.features.bedrooms >= filters.bedrooms!);
            }
            if (filters.location) {
                const searchTerm = filters.location.toLowerCase();
                filteredProperties = filteredProperties.filter(p =>
                    p.location.city.toLowerCase().includes(searchTerm) ||
                    p.location.region.toLowerCase().includes(searchTerm) ||
                    p.location.address.toLowerCase().includes(searchTerm)
                );
            }
        }

        // Tri : Premium en premier, puis par date
        return filteredProperties.sort((a, b) => {
            if (a.isPremium && !b.isPremium) return -1;
            if (!a.isPremium && b.isPremium) return 1;
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });
    }

    static async getProperty(id: string): Promise<Property | null> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.properties.find(p => p.id === id) || null;
    }

    static async getFeaturedProperties(): Promise<Property[]> {
        await new Promise(resolve => setTimeout(resolve, 400));
        return this.properties
            .filter(p => p.isPremium)
            .sort((a, b) => b.views - a.views)
            .slice(0, 6);
    }

    static async searchProperties(query: string): Promise<Property[]> {
        await new Promise(resolve => setTimeout(resolve, 600));
        const searchTerm = query.toLowerCase();

        return this.properties.filter(p =>
            p.title.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.location.city.toLowerCase().includes(searchTerm) ||
            p.location.address.toLowerCase().includes(searchTerm)
        );
    }
}
