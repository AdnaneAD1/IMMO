'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Property } from '@/types';
import {
    ArrowLeft,
    MapPin,
    Bed,
    Bath,
    Square,
    Calendar,
    Heart,
    Share2,
    Phone,
    Mail,
    MessageCircle,
    Car,
    Building,
    User,
    Eye,
    ChevronLeft,
    ChevronRight,
    X
} from 'lucide-react';// Mock data - Dans un vrai projet, cela viendrait d'une API
const mockProperty: Property = {
    id: '1',
    title: 'Appartement T3 lumineux avec balcon',
    description: 'Magnifique appartement T3 de 75m² situé au 3ème étage d\'un immeuble récent. Exposition sud-ouest offrant une luminosité exceptionnelle tout au long de la journée. L\'appartement se compose d\'une entrée avec placard, d\'un séjour spacieux de 28m² avec accès direct au balcon de 8m², d\'une cuisine équipée et aménagée, de deux chambres confortables avec placards intégrés, d\'une salle de bain moderne avec baignoire, et d\'un WC séparé. Un parking souterrain et une cave complètent ce bien. Proche de toutes commodités : transports en commun, commerces, écoles. Quartier calme et résidentiel.',
    price: 285000,
    location: {
        address: '123 Rue de la République',
        city: 'Lyon',
        region: 'Auvergne-Rhône-Alpes',
        postalCode: '69006',
        coordinates: {
            lat: 45.7640,
            lng: 4.8357
        }
    },
    category: 'apartment',
    type: 'sale',
    features: {
        surface: 75,
        rooms: 3,
        bedrooms: 2,
        bathrooms: 1,
        floor: 3,
        totalFloors: 6,
        parking: true,
        balcony: true,
        elevator: true,
        energyClass: 'C'
    },
    images: [
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600'
    ],
    agent: {
        id: '1',
        name: 'Sophie Martin',
        type: 'agency',
        company: 'Agence Centrale Immobilier',
        phone: '+33 4 78 123 456',
        email: 'sophie.martin@agence-centrale.fr',
        avatar: '/api/placeholder/100/100',
        rating: 4.8,
        reviewsCount: 156,
        verified: true
    },
    isPremium: false,
    isAvailable: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    views: 1234,
    favorites: 12
};

export default function PropertyDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        // Simulation du chargement des données
        const loadProperty = async () => {
            setLoading(true);
            // Dans un vrai projet, on ferait un appel API avec params.id
            await new Promise(resolve => setTimeout(resolve, 500));
            setProperty(mockProperty);
            setIsLiked(false); // Initialement pas liké
            setLoading(false);
        };

        loadProperty();
    }, [params.id]);

    const toggleLike = () => {
        setIsLiked(!isLiked);
        // Ici on enverrait la requête à l'API
    };

    const shareProperty = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: property?.title,
                    text: property?.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Erreur lors du partage:', err);
            }
        } else {
            // Fallback pour les navigateurs qui ne supportent pas l'API de partage
            navigator.clipboard.writeText(window.location.href);
            alert('Lien copié dans le presse-papiers !');
        }
    };

    const nextImage = () => {
        if (property) {
            setCurrentImageIndex((prev) =>
                prev === property.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (property) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? property.images.length - 1 : prev - 1
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-32 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Propriété non trouvée
                    </h2>
                    <p className="text-gray-600 mb-6">
                        La propriété que vous recherchez n&apos;existe pas ou a été supprimée.
                    </p>
                    <button
                        onClick={() => router.push('/properties')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retour aux annonces
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Retour</span>
                    </button>
                    <span>/</span>
                    <span>Propriétés</span>
                    <span>/</span>
                    <span className="text-gray-900">{property.title}</span>
                </div>

                {/* Galerie d&apos;images */}
                <div className="relative mb-8 rounded-lg overflow-hidden">
                    <div className="aspect-[16/9] bg-gray-200 relative">
                        <Image
                            src={property.images[currentImageIndex]}
                            alt={`${property.title} - Image ${currentImageIndex + 1}`}
                            fill
                            className="object-cover cursor-pointer"
                            onClick={() => setShowImageModal(true)}
                        />
                    </div>

                    {/* Navigation d&apos;images */}
                    {property.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                aria-label="Image précédente"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                aria-label="Image suivante"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>

                            {/* Indicateurs */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {property.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                            }`}
                                        aria-label={`Aller à l&apos;image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                            onClick={toggleLike}
                            className={`p-3 rounded-full transition-colors ${isLiked
                                ? 'bg-red-500 text-white'
                                : 'bg-white/90 text-gray-700 hover:bg-white'
                                }`}
                            aria-label={isLiked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        >
                            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                        <button
                            onClick={shareProperty}
                            className="p-3 bg-white/90 text-gray-700 rounded-full hover:bg-white transition-colors"
                            aria-label="Partager"
                        >
                            <Share2 className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Miniatures */}
                    {property.images.length > 1 && (
                        <div className="absolute bottom-4 left-4 flex space-x-2">
                            <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                {currentImageIndex + 1} / {property.images.length}
                            </span>
                        </div>
                    )}
                </div>

                {/* Contenu principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Informations principales */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Titre et prix */}
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {property.title}
                                    </h1>
                                    <div className="flex items-center space-x-4 text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{property.location.city}, {property.location.postalCode}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Eye className="h-4 w-4" />
                                            <span>{property.views} vues</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>Publié le {property.createdAt.toLocaleDateString('fr-FR')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-blue-600">
                                        {property.price.toLocaleString('fr-FR')} €
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {Math.round(property.price / property.features.surface)} €/m²
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Caractéristiques */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Caractéristiques
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <Square className="h-6 w-6 text-blue-600" />
                                    <div>
                                        <div className="font-semibold text-gray-900">{property.features.surface} m²</div>
                                        <div className="text-sm text-gray-600">Surface</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <Bed className="h-6 w-6 text-blue-600" />
                                    <div>
                                        <div className="font-semibold text-gray-900">{property.features.rooms}</div>
                                        <div className="text-sm text-gray-600">Pièces</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <Bed className="h-6 w-6 text-blue-600" />
                                    <div>
                                        <div className="font-semibold text-gray-900">{property.features.bedrooms}</div>
                                        <div className="text-sm text-gray-600">Chambres</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <Bath className="h-6 w-6 text-blue-600" />
                                    <div>
                                        <div className="font-semibold text-gray-900">{property.features.bathrooms}</div>
                                        <div className="text-sm text-gray-600">Salle de bain</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Description
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {property.description}
                            </p>
                        </div>

                        {/* Équipements */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Équipements et services
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {property.features.parking && (
                                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                                        <Car className="w-4 h-4 text-blue-600" />
                                        <span className="text-gray-700">Parking</span>
                                    </div>
                                )}
                                {property.features.balcony && (
                                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-gray-700">Balcon</span>
                                    </div>
                                )}
                                {property.features.elevator && (
                                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-gray-700">Ascenseur</span>
                                    </div>
                                )}
                                {property.features.garden && (
                                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-gray-700">Jardin</span>
                                    </div>
                                )}
                                {property.features.energyClass && (
                                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-gray-700">Classe énergétique: {property.features.energyClass}</span>
                                    </div>
                                )}
                                {property.features.floor && (
                                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                                        <Building className="w-4 h-4 text-blue-600" />
                                        <span className="text-gray-700">{property.features.floor}ème étage</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact agent */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Contacter l&apos;agent
                            </h3>

                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User className="h-6 w-6 text-gray-500" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {property.agent.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {property.agent.company}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href={`tel:${property.agent.phone}`}
                                    className="flex items-center space-x-3 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Phone className="h-5 w-5" />
                                    <span className="font-medium">Appeler</span>
                                </a>

                                <a
                                    href={`mailto:${property.agent.email}`}
                                    className="flex items-center space-x-3 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Mail className="h-5 w-5 text-gray-600" />
                                    <span className="font-medium text-gray-700">Email</span>
                                </a>

                                <button
                                    onClick={() => router.push('/messages')}
                                    className="flex items-center space-x-3 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <MessageCircle className="h-5 w-5 text-gray-600" />
                                    <span className="font-medium text-gray-700">Message</span>
                                </button>
                            </div>
                        </div>

                        {/* Calculateur de prêt */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Simulation de prêt
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Apport personnel
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="50000"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Durée (années)
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        aria-label="Durée du prêt"
                                    >
                                        <option value="15">15 ans</option>
                                        <option value="20">20 ans</option>
                                        <option value="25">25 ans</option>
                                    </select>
                                </div>

                                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    Calculer
                                </button>

                                <div className="text-center text-sm text-gray-600">
                                    Mensualité estimée : <span className="font-semibold">1 200 €/mois</span>
                                </div>
                            </div>
                        </div>

                        {/* Propriétés similaires */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Propriétés similaires
                            </h3>
                            <div className="text-center text-gray-500">
                                Bientôt disponible
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal galerie d&apos;images */}
            {showImageModal && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl w-full">
                        <button
                            onClick={() => setShowImageModal(false)}
                            className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors z-10"
                            aria-label="Fermer la galerie"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <Image
                            src={property.images[currentImageIndex]}
                            alt={`${property.title} - Image ${currentImageIndex + 1}`}
                            width={800}
                            height={600}
                            className="w-full h-auto max-h-[80vh] object-contain"
                        />

                        {property.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/20 rounded-full transition-colors"
                                    aria-label="Image précédente"
                                >
                                    <ChevronLeft className="h-8 w-8" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/20 rounded-full transition-colors"
                                    aria-label="Image suivante"
                                >
                                    <ChevronRight className="h-8 w-8" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
