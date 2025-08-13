'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchFilters as SearchFiltersType, PropertyType, PropertyCategory } from '@/types';
import { useProperties } from '@/hooks/useProperties';
import PropertyCard from '@/components/properties/PropertyCard';
import SearchFilters from '@/components/properties/SearchFilters';
import { Grid, List, Filter, SlidersHorizontal } from 'lucide-react';

function PropertiesPageContent() {
    const searchParams = useSearchParams();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    // Extraire les filtres des paramètres URL
    const initialFilters: SearchFiltersType = {
        type: (searchParams.get('type') as PropertyType) || undefined,
        category: (searchParams.get('category') as PropertyCategory) || undefined,
        location: searchParams.get('location') || undefined,
        priceMin: searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : undefined,
        priceMax: searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : undefined,
        surfaceMin: searchParams.get('surfaceMin') ? parseInt(searchParams.get('surfaceMin')!) : undefined,
        surfaceMax: searchParams.get('surfaceMax') ? parseInt(searchParams.get('surfaceMax')!) : undefined,
        rooms: searchParams.get('rooms') ? parseInt(searchParams.get('rooms')!) : undefined,
        bedrooms: searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')!) : undefined,
    };

    const { properties, loading, error, filters, updateFilters } = useProperties(initialFilters);

    const handleSearch = (newFilters: SearchFiltersType) => {
        updateFilters(newFilters);

        // Mettre à jour l'URL avec les nouveaux filtres
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.set(key, value.toString());
            }
        });

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Recherche de biens immobiliers
                    </h1>
                    <p className="text-gray-600">
                        {loading ? 'Chargement...' : `${properties.length} propriété${properties.length > 1 ? 's' : ''} trouvée${properties.length > 1 ? 's' : ''}`}
                    </p>
                </div>

                {/* Filtres de recherche */}
                <div className={`mb-8 ${showFilters ? '' : 'lg:hidden'}`}>
                    <SearchFilters
                        onSearch={handleSearch}
                        initialFilters={filters}
                    />
                </div>

                {/* Contrôles d'affichage */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Filter className="h-5 w-5" />
                            <span>Filtres</span>
                        </button>

                        <div className="hidden lg:flex items-center space-x-2">
                            <SlidersHorizontal className="h-5 w-5 text-black" />
                            <span className="text-sm text-black">
                                {Object.keys(filters).filter(key => filters[key as keyof SearchFiltersType]).length} filtre(s) actif(s)
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Affichage :</span>
                        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    } transition-colors`}
                                aria-label="Affichage en grille"
                                title="Affichage en grille"
                            >
                                <Grid className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    } transition-colors`}
                                aria-label="Affichage en liste"
                                title="Affichage en liste"
                            >
                                <List className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Filtres sidebar (desktop) */}
                    <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
                        <div className="sticky top-24">
                            <SearchFilters
                                onSearch={handleSearch}
                                initialFilters={filters}
                                className="shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Liste des propriétés */}
                    <div className="flex-1 min-w-0">{/* Ajout de min-w-0 pour éviter l'overflow */}
                        {loading ? (
                            <div className={`grid gap-6 ${viewMode === 'grid'
                                ? 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'
                                : 'grid-cols-1'
                                }`}>
                                {[...Array(9)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`bg-gray-200 animate-pulse rounded-lg ${viewMode === 'grid' ? 'h-96' : 'h-64'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                        ) : properties.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="max-w-md mx-auto">
                                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                                        <Filter className="h-12 w-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Aucune propriété trouvée
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Essayez de modifier vos critères de recherche pour obtenir plus de résultats.
                                    </p>
                                    <button
                                        onClick={() => handleSearch({})}
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Réinitialiser les filtres
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={`grid gap-6 ${viewMode === 'grid'
                                ? 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'
                                : 'grid-cols-1'
                                }`}>
                                {properties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                        variant={viewMode === 'list' ? 'default' : 'compact'}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination (placeholder) */}
                        {!loading && properties.length > 0 && (
                            <div className="mt-12 flex justify-center">
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        aria-label="Page précédente"
                                    >
                                        Précédent
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                        aria-label="Page 1, page actuelle"
                                        aria-current="page"
                                    >
                                        1
                                    </button>
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        aria-label="Aller à la page 2"
                                    >
                                        2
                                    </button>
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        aria-label="Aller à la page 3"
                                    >
                                        3
                                    </button>
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        aria-label="Page suivante"
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PropertiesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        }>
            <PropertiesPageContent />
        </Suspense>
    );
}
