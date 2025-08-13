'use client';

import { useState } from 'react';
import { SearchFilters as SearchFiltersType, PropertyType, PropertyCategory } from '@/types';
import { Search, Filter, X, MapPin, Euro, Home, Bed, Users } from 'lucide-react';

interface SearchFiltersProps {
    onSearch: (filters: SearchFiltersType) => void;
    initialFilters?: SearchFiltersType;
    className?: string;
    variant?: 'light' | 'dark';
}

export default function SearchFilters({ onSearch, initialFilters = {}, className = '', variant = 'light' }: SearchFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [filters, setFilters] = useState<SearchFiltersType>(initialFilters);

    const propertyTypes: { value: PropertyType; label: string }[] = [
        { value: 'sale', label: 'Vente' },
        { value: 'rent', label: 'Location' }
    ];

    const propertyCategories: { value: PropertyCategory; label: string }[] = [
        { value: 'apartment', label: 'Appartement' },
        { value: 'house', label: 'Maison' },
        { value: 'villa', label: 'Villa' },
        { value: 'studio', label: 'Studio' },
        { value: 'office', label: 'Bureau' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'land', label: 'Terrain' }
    ];

    const handleInputChange = (key: keyof SearchFiltersType, value: string | number | undefined) => {
        const newFilters = { ...filters, [key]: value || undefined };
        setFilters(newFilters);
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    const clearFilters = () => {
        const emptyFilters = {};
        setFilters(emptyFilters);
        onSearch(emptyFilters);
    };

    const hasActiveFilters = Object.keys(filters).some(key =>
        filters[key as keyof SearchFiltersType] !== undefined && filters[key as keyof SearchFiltersType] !== ''
    );

    // Styles conditionnels selon la variante
    const isDark = variant === 'dark';
    const inputClasses = isDark
        ? "w-full pl-10 pr-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/70 bg-white/10 backdrop-blur-sm"
        : "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500";

    const buttonClasses = isDark
        ? "flex items-center space-x-2 px-4 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition-colors text-white"
        : "flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors";

    const labelClasses = isDark
        ? "block text-sm font-medium text-white mb-2"
        : "block text-sm font-medium text-gray-700 mb-2";

    const selectClasses = isDark
        ? "w-full pl-10 pr-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white bg-white/10 backdrop-blur-sm"
        : "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white";

    const optionClasses = isDark
        ? "bg-gray-800 text-white"
        : "bg-white text-gray-900";

    const typeButtonClasses = (isActive: boolean) => isDark
        ? `px-4 py-2 rounded-lg border transition-colors ${isActive
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
        }`
        : `px-4 py-2 rounded-lg border transition-colors ${isActive
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`;

    return (
        <div className={`${isDark ? 'bg-white/10 backdrop-blur-sm' : 'bg-white'} rounded-lg shadow-lg p-6 ${className}`}>
            {/* Barre de recherche principale */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                    <MapPin className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-white/70' : 'text-gray-400'}`} />
                    <input
                        type="text"
                        placeholder="Ville, quartier, adresse..."
                        value={filters.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className={inputClasses}
                    />
                </div>

                <div className="flex gap-2 min-w-0">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={buttonClasses}
                    >
                        <Filter className="h-5 w-5" />
                        <span>Filtres</span>
                        {hasActiveFilters && (
                            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {Object.keys(filters).filter(key => filters[key as keyof SearchFiltersType]).length}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={handleSearch}
                        className={`flex items-center justify-center space-x-1 px-3 py-3 rounded-lg transition-colors flex-shrink-0 ${isDark
                            ? 'bg-blue-500 text-white hover:bg-blue-400'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        <Search className="h-5 w-5" />
                        <span className="hidden sm:inline">Rechercher</span>
                    </button>
                </div>
            </div>

            {/* Filtres étendus */}
            {isExpanded && (
                <div className="border-t pt-6 space-y-8">{/* Augmentation de l'espacement de space-y-6 à space-y-8 */}
                    {/* Type de transaction */}
                    <div>
                        <label className={labelClasses}>
                            Type de transaction
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {propertyTypes.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => handleInputChange('type', filters.type === type.value ? undefined : type.value)}
                                    className={typeButtonClasses(filters.type === type.value)}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Type de bien */}
                    <div>
                        <label className={labelClasses}>
                            Type de bien
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {propertyCategories.map((category) => (
                                <button
                                    key={category.value}
                                    onClick={() => handleInputChange('category', filters.category === category.value ? undefined : category.value)}
                                    className={typeButtonClasses(filters.category === category.value)}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>                    {/* Prix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>
                                Prix minimum
                            </label>
                            <div className="relative">
                                <Euro className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-white/70' : 'text-gray-400'}`} />
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={filters.priceMin || ''}
                                    onChange={(e) => handleInputChange('priceMin', e.target.value ? parseInt(e.target.value) : undefined)}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={labelClasses}>
                                Prix maximum
                            </label>
                            <div className="relative">
                                <Euro className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-white/70' : 'text-gray-400'}`} />
                                <input
                                    type="number"
                                    placeholder="∞"
                                    value={filters.priceMax || ''}
                                    onChange={(e) => handleInputChange('priceMax', e.target.value ? parseInt(e.target.value) : undefined)}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Surface */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>
                                Surface min (m²)
                            </label>
                            <div className="relative">
                                <Home className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-white/70' : 'text-gray-400'}`} />
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={filters.surfaceMin || ''}
                                    onChange={(e) => handleInputChange('surfaceMin', e.target.value ? parseInt(e.target.value) : undefined)}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={labelClasses}>
                                Surface max (m²)
                            </label>
                            <div className="relative">
                                <Home className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-white/70' : 'text-gray-400'}`} />
                                <input
                                    type="number"
                                    placeholder="∞"
                                    value={filters.surfaceMax || ''}
                                    onChange={(e) => handleInputChange('surfaceMax', e.target.value ? parseInt(e.target.value) : undefined)}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Nombre de pièces et chambres */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>
                                Pièces minimum
                            </label>
                            <div className="relative">
                                <Users className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-white/70' : 'text-gray-400'}`} />
                                <select
                                    value={filters.rooms || ''}
                                    onChange={(e) => handleInputChange('rooms', e.target.value ? parseInt(e.target.value) : undefined)}
                                    aria-label="Nombre de pièces minimum"
                                    className={selectClasses}
                                >
                                    <option value="" className={optionClasses}>Indifférent</option>
                                    {[1, 2, 3, 4, 5, 6].map(num => (
                                        <option key={num} value={num} className={optionClasses}>{num} pièce{num > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className={labelClasses}>
                                Chambres minimum
                            </label>
                            <div className="relative">
                                <Bed className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-white/70' : 'text-gray-400'}`} />
                                <select
                                    value={filters.bedrooms || ''}
                                    onChange={(e) => handleInputChange('bedrooms', e.target.value ? parseInt(e.target.value) : undefined)}
                                    aria-label="Nombre de chambres minimum"
                                    className={selectClasses}
                                >
                                    <option value="" className={optionClasses}>Indifférent</option>
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <option key={num} value={num} className={optionClasses}>{num} chambre{num > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between pt-4 border-t">
                        <button
                            onClick={clearFilters}
                            className={`flex items-center space-x-2 transition-colors ${isDark
                                ? 'text-white/70 hover:text-white'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <X className="h-4 w-4" />
                            <span>Effacer les filtres</span>
                        </button>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setIsExpanded(false)}
                                className={`px-4 py-2 rounded-lg transition-colors ${isDark
                                    ? 'border border-white/30 hover:bg-white/10 text-white'
                                    : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                Fermer
                            </button>
                            <button
                                onClick={handleSearch}
                                className={`px-6 py-2 rounded-lg transition-colors ${isDark
                                    ? 'bg-blue-500 text-white hover:bg-blue-400'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                Appliquer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
