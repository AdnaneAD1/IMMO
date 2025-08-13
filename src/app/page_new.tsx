'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property, SearchFilters } from '@/types';
import { PropertyService } from '@/services/propertyService';
import { useFeaturedProperties } from '@/hooks/useProperties';
import PropertyCard from '@/components/properties/PropertyCard';
import SearchFiltersComponent from '@/components/properties/SearchFilters';
import { Search, TrendingUp, Shield, Award, MapPin, Users, Building, Star } from 'lucide-react';

export default function HomePage() {
    const { properties: featuredProperties, loading: featuredLoading } = useFeaturedProperties();
    const [recentProperties, setRecentProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecentProperties = async () => {
            try {
                const properties = await PropertyService.getProperties();
                setRecentProperties(properties.slice(0, 8));
            } catch (error) {
                console.error('Error loading recent properties:', error);
            } finally {
                setLoading(false);
            }
        };

        loadRecentProperties();
    }, []);

    const handleSearch = (filters: SearchFilters) => {
        // Rediriger vers la page de recherche avec les filtres
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.set(key, value.toString());
            }
        });
        window.location.href = `/properties?${params.toString()}`;
    };

    const stats = [
        { icon: Building, value: '10,000+', label: 'Propriétés' },
        { icon: Users, value: '5,000+', label: 'Agents certifiés' },
        { icon: Star, value: '4.8/5', label: 'Satisfaction client' },
        { icon: MapPin, value: '50+', label: 'Villes couvertes' }
    ];

    const features = [
        {
            icon: Search,
            title: 'Recherche intelligente',
            description: 'Trouvez le bien idéal grâce à nos filtres avancés et notre algorithme de recommandation.'
        },
        {
            icon: Shield,
            title: 'Transactions sécurisées',
            description: 'Profitez de nos garanties et de notre service de protection pour des achats en toute sérénité.'
        },
        {
            icon: Award,
            title: 'Agents certifiés',
            description: 'Travaillez avec des professionnels vérifiés et notés par notre communauté.'
        },
        {
            icon: TrendingUp,
            title: 'Estimation en temps réel',
            description: 'Obtenez une estimation précise de votre bien grâce à notre IA et nos données de marché.'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Trouvez votre{' '}
                            <span className="text-yellow-400">bien immobilier</span>
                            <br />
                            en toute simplicité
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                            La marketplace qui réunit particuliers et professionnels pour des transactions immobilières transparentes et sécurisées.
                        </p>
                    </div>

                    {/* Search Component */}
                    <div className="max-w-4xl mx-auto">
                        <SearchFiltersComponent onSearch={handleSearch} className="bg-white/10 backdrop-blur-sm border border-white/20" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4">
                                    <stat.icon className="h-12 w-12 text-blue-600" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Propriétés mises en avant
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Découvrez une sélection de biens exceptionnels proposés par nos partenaires premium.
                        </p>
                    </div>

                    {featuredLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {featuredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} variant="featured" />
                            ))}
                        </div>
                    )}

                    <div className="text-center">
                        <Link
                            href="/properties?premium=true"
                            className="inline-flex items-center px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                        >
                            Voir toutes les propriétés premium
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Pourquoi choisir ImmoMarket ?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Une plateforme innovante qui simplifie votre recherche immobilière.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex justify-center mb-4">
                                    <feature.icon className="h-12 w-12 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-center">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Properties Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Annonces récentes
                            </h2>
                            <p className="text-xl text-gray-600">
                                Les dernières propriétés ajoutées à notre catalogue.
                            </p>
                        </div>
                        <Link
                            href="/properties"
                            className="hidden md:inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Voir toutes les annonces
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {recentProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} variant="compact" />
                            ))}
                        </div>
                    )}

                    <div className="text-center md:hidden">
                        <Link
                            href="/properties"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Voir toutes les annonces
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Prêt à trouver votre prochain bien ?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Rejoignez des milliers d&apos;utilisateurs qui font confiance à ImmoMarket pour leurs projets immobiliers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/properties"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Commencer ma recherche
                        </Link>
                        <Link
                            href="/properties/create"
                            className="inline-flex items-center px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                        >
                            Publier une annonce
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
