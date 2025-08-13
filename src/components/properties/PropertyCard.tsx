'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';
import { formatPrice, formatSurface, getPropertyTypeLabel, getPropertyCategoryLabel, getAgentTypeLabel } from '@/lib/utils';
import { MapPin, Camera, Heart, Star, Badge, User, Building } from 'lucide-react';
import { useState } from 'react';

interface PropertyCardProps {
    property: Property;
    variant?: 'default' | 'featured' | 'compact';
}

export default function PropertyCard({ property, variant = 'default' }: PropertyCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';

    return (
        <div className={`
      bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group
      ${isFeatured ? 'ring-2 ring-yellow-400 ring-opacity-60' : ''}
      ${isCompact ? 'max-w-sm' : 'max-w-md'}
    `}>
            <Link href={`/properties/${property.id}`}>
                {/* Image */}
                <div className="relative overflow-hidden">
                    <div className={`relative ${isCompact ? 'h-48' : 'h-64'}`}>
                        {!imageError ? (
                            <Image
                                src={property.images[0] || '/api/placeholder/400/300'}
                                alt={property.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <Camera className="h-12 w-12 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        {property.isPremium && (
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                                <Badge className="h-3 w-3" />
                                <span>Premium</span>
                            </span>
                        )}
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {getPropertyTypeLabel(property.type)}
                        </span>
                    </div>

                    {/* Photos count */}
                    {property.images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                            <Camera className="h-3 w-3" />
                            <span>{property.images.length}</span>
                        </div>
                    )}

                    {/* Favorite button */}
                    <button
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                        className={`
              absolute bottom-3 right-3 p-2 rounded-full transition-all duration-200
              ${isFavorite
                                ? 'bg-red-500 text-white'
                                : 'bg-white bg-opacity-90 text-gray-600 hover:bg-red-500 hover:text-white'
                            }
            `}
                    >
                        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">
                            {formatPrice(property.price)}
                            {property.type === 'rent' && <span className="text-sm text-gray-500">/mois</span>}
                        </span>
                        {property.agent.verified && (
                            <div className="flex items-center space-x-1 text-green-600">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-xs">Vérifié</span>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {property.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{property.location.city}, {property.location.region}</span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{formatSurface(property.features.surface)}</span>
                        <span>•</span>
                        <span>{property.features.rooms} pièces</span>
                        {property.features.bedrooms > 0 && (
                            <>
                                <span>•</span>
                                <span>{property.features.bedrooms} ch.</span>
                            </>
                        )}
                    </div>

                    {/* Category */}
                    <div className="flex items-center justify-between">
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {getPropertyCategoryLabel(property.category)}
                        </span>

                        {/* Agent info */}
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                            {property.agent.type === 'agency' ? (
                                <Building className="h-3 w-3" />
                            ) : (
                                <User className="h-3 w-3" />
                            )}
                            <span>{getAgentTypeLabel(property.agent.type)}</span>
                        </div>
                    </div>

                    {/* Agent rating and views (non-compact only) */}
                    {!isCompact && (
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">
                                    {property.agent.rating} ({property.agent.reviewsCount} avis)
                                </span>
                            </div>
                            <span className="text-xs text-gray-400">
                                {property.views} vues
                            </span>
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
}
