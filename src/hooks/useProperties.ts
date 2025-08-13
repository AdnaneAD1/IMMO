'use client';

import { useState, useEffect } from 'react';
import { Property, SearchFilters } from '@/types';
import { PropertyService } from '@/services/propertyService';

export function useProperties(initialFilters?: SearchFilters) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<SearchFilters>(initialFilters || {});

    const fetchProperties = async (newFilters?: SearchFilters) => {
        try {
            setLoading(true);
            setError(null);
            const filtersToUse = newFilters || filters;
            const data = await PropertyService.getProperties(filtersToUse);
            setProperties(data);
        } catch (err) {
            setError('Erreur lors du chargement des propriétés');
            console.error('Error fetching properties:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateFilters = (newFilters: SearchFilters) => {
        setFilters(newFilters);
        fetchProperties(newFilters);
    };

    const clearFilters = () => {
        const emptyFilters = {};
        setFilters(emptyFilters);
        fetchProperties(emptyFilters);
    };

    useEffect(() => {
        fetchProperties();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        properties,
        loading,
        error,
        filters,
        updateFilters,
        clearFilters,
        refetch: fetchProperties
    };
}

export function useProperty(id: string) {
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await PropertyService.getProperty(id);
                setProperty(data);
            } catch (err) {
                setError('Erreur lors du chargement de la propriété');
                console.error('Error fetching property:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

    return { property, loading, error };
}

export function useFeaturedProperties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await PropertyService.getFeaturedProperties();
                setProperties(data);
            } catch (err) {
                setError('Erreur lors du chargement des propriétés mises en avant');
                console.error('Error fetching featured properties:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    return { properties, loading, error };
}

export function useSearch() {
    const [results, setResults] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await PropertyService.searchProperties(query);
            setResults(data);
        } catch (err) {
            setError('Erreur lors de la recherche');
            console.error('Error searching properties:', err);
        } finally {
            setLoading(false);
        }
    };

    const clearResults = () => {
        setResults([]);
        setError(null);
    };

    return {
        results,
        loading,
        error,
        search,
        clearResults
    };
}
