'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/types';
import { PropertyService } from '@/services/propertyService';
import PropertyCard from '@/components/properties/PropertyCard';
import { Heart, Grid, List, Filter } from 'lucide-react';

export default function FavoritesPage() {
    const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                // Pour la démo, on prend les propriétés premium comme favoris
                const properties = await PropertyService.getFeaturedProperties();
                setFavoriteProperties(properties);
            } catch (error) {
                console.error('Error loading favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    const removeFavorite = (propertyId: string) => {
        setFavoriteProperties(prev => prev.filter(p => p.id !== propertyId));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <Heart className="h-8 w-8 text-red-500" />
                        <h1 className="text-3xl font-bold text-gray-900">Mes Favoris</h1>
                    </div>
                    <p className="text-gray-600">
                        {loading ? 'Chargement...' : `${favoriteProperties.length} propriété${favoriteProperties.length > 1 ? 's' : ''} sauvegardée${favoriteProperties.length > 1 ? 's' : ''}`}
                    </p>
                </div>

                {/* Contrôles d'affichage */}
                {favoriteProperties.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Filter className="h-5 w-5 text-gray-400" />
                                <span className="text-sm text-gray-600">Trier par :</span>
                                <select
                                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                                    aria-label="Trier les favoris"
                                >
                                    <option>Date d&apos;ajout</option>
                                    <option>Prix croissant</option>
                                    <option>Prix décroissant</option>
                                    <option>Surface</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Affichage :</span>
                            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    aria-label="Affichage en grille"
                                    className={`p-2 ${viewMode === 'grid'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                        } transition-colors`}
                                >
                                    <Grid className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    aria-label="Affichage en liste"
                                    className={`p-2 ${viewMode === 'list'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                        } transition-colors`}
                                >
                                    <List className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contenu */}
                {loading ? (
                    <div className={`grid gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                        }`}>
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className={`bg-gray-200 animate-pulse rounded-lg ${viewMode === 'grid' ? 'h-96' : 'h-64'
                                    }`}
                            ></div>
                        ))}
                    </div>
                ) : favoriteProperties.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                                <Heart className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Aucune propriété dans vos favoris pour l&apos;instant
                            </h3>
                            <p className="text-gray-600 mb-8">
                                Ajoutez des propriétés à vos favoris en cliquant sur le cœur lors de vos recherches.
                            </p>
                            <a
                                href="/properties"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Découvrir les propriétés
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className={`grid gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                        }`}>
                        {favoriteProperties.map((property) => (
                            <div key={property.id} className="relative">
                                <PropertyCard
                                    property={property}
                                    variant={viewMode === 'list' ? 'default' : 'compact'}
                                />
                                <button
                                    onClick={() => removeFavorite(property.id)}
                                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    title="Retirer des favoris"
                                >
                                    <Heart className="h-4 w-4 fill-current" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Suggestions */}
                {favoriteProperties.length > 0 && (
                    <div className="mt-16 bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Propriétés similaires qui pourraient vous intéresser
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Basé sur vos préférences et vos propriétés favorites
                        </p>
                        <a
                            href="/properties"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Voir les suggestions
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
