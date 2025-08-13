'use client';

import { useState } from 'react';
import { Plus, X, Upload, MapPin, Euro, Camera, CheckCircle, AlertCircle } from 'lucide-react';

interface PropertyFormData {
    title: string;
    description: string;
    type: 'apartment' | 'house' | 'commercial' | 'land';
    transactionType: 'sale' | 'rent';
    price: string;
    surface: string;
    rooms: string;
    bedrooms: string;
    bathrooms: string;
    address: string;
    city: string;
    postalCode: string;
    features: string[];
    images: File[];
}const initialFormData: PropertyFormData = {
    title: '',
    description: '',
    type: 'apartment',
    transactionType: 'sale',
    price: '',
    surface: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    address: '',
    city: '',
    postalCode: '',
    features: [],
    images: []
};

const availableFeatures = [
    'Balcon',
    'Terrasse',
    'Jardin',
    'Garage',
    'Parking',
    'Cave',
    'Ascenseur',
    'Climatisation',
    'Cheminée',
    'Piscine',
    'Salle de sport',
    'Gardien',
    'Sécurisé',
    'Proche transports',
    'Vue mer',
    'Vue montagne'
];

export default function CreatePropertyPage() {
    const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const updateField = (field: keyof PropertyFormData, value: string | string[] | File[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addFeature = (feature: string) => {
        if (!formData.features.includes(feature)) {
            updateField('features', [...formData.features, feature]);
        }
    };

    const removeFeature = (feature: string) => {
        updateField('features', formData.features.filter(f => f !== feature));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        updateField('images', [...formData.images, ...files]);
    };

    const removeImage = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        updateField('images', newImages);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulation d'une soumission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData(initialFormData);
            setCurrentStep(1);
            setSubmitSuccess(false);
        }, 3000);
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Propriété créée avec succès !
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Votre annonce sera vérifiée et publiée dans les prochaines 24 heures.
                    </p>
                    <div className="animate-pulse text-sm text-gray-500">
                        Redirection en cours...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <Plus className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Créer une annonce</h1>
                    </div>
                    <p className="text-gray-600">
                        Ajoutez votre propriété en quelques étapes simples
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-600">Étape {currentStep} sur 3</span>
                        <span className="text-sm text-gray-500">
                            {currentStep === 1 && 'Informations générales'}
                            {currentStep === 2 && 'Détails et caractéristiques'}
                            {currentStep === 3 && 'Photos et finalisation'}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`bg-blue-600 h-2 rounded-full transition-all duration-300 ${currentStep === 1 ? 'w-1/3' :
                                currentStep === 2 ? 'w-2/3' : 'w-full'
                                }`}
                        ></div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* Étape 1: Informations générales */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Informations générales
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Titre de l&apos;annonce *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => updateField('title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ex: Appartement T3 lumineux avec balcon"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Type de bien *
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => updateField('type', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        aria-label="Sélectionner le type de bien"
                                    >
                                        <option value="apartment">Appartement</option>
                                        <option value="house">Maison</option>
                                        <option value="commercial">Local commercial</option>
                                        <option value="land">Terrain</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Type de transaction *
                                    </label>
                                    <select
                                        value={formData.transactionType}
                                        onChange={(e) => updateField('transactionType', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        aria-label="Sélectionner le type de transaction"
                                    >
                                        <option value="sale">Vente</option>
                                        <option value="rent">Location</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Euro className="inline h-4 w-4 mr-1" />
                                    Prix *
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => updateField('price', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="285000"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">€</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => updateField('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Décrivez votre propriété en détail..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Étape 2: Détails et caractéristiques */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Détails et caractéristiques
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Surface (m²) *
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.surface}
                                        onChange={(e) => updateField('surface', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="75"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre de pièces
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.rooms}
                                        onChange={(e) => updateField('rooms', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Chambres
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.bedrooms}
                                        onChange={(e) => updateField('bedrooms', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Salles de bain
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.bathrooms}
                                        onChange={(e) => updateField('bathrooms', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="inline h-4 w-4 mr-1" />
                                        Ville *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => updateField('city', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Lyon"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Code postal *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.postalCode}
                                        onChange={(e) => updateField('postalCode', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="69002"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Adresse complète *
                                </label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => updateField('address', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="123 Rue de la République"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Équipements et services
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {availableFeatures.map((feature) => (
                                        <button
                                            key={feature}
                                            type="button"
                                            onClick={() =>
                                                formData.features.includes(feature)
                                                    ? removeFeature(feature)
                                                    : addFeature(feature)
                                            }
                                            className={`p-3 text-sm rounded-lg border transition-colors ${formData.features.includes(feature)
                                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {feature}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Étape 3: Photos et finalisation */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Photos et finalisation
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    <Camera className="inline h-4 w-4 mr-1" />
                                    Photos de la propriété
                                </label>

                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                                        <span className="text-lg font-medium text-gray-700 mb-2">
                                            Ajoutez des photos
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Glissez vos images ici ou cliquez pour les sélectionner
                                        </span>
                                    </label>
                                </div>

                                {formData.images.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                                            Images sélectionnées ({formData.images.length})
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {formData.images.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <Camera className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                        aria-label="Supprimer l'image"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                    <p className="mt-1 text-xs text-gray-500 truncate">
                                                        {image.name}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-blue-900">À savoir</h4>
                                        <ul className="mt-2 text-sm text-blue-800 space-y-1">
                                            <li>• Votre annonce sera vérifiée avant publication</li>
                                            <li>• La publication est gratuite pour les particuliers</li>
                                            <li>• Vous recevrez un email de confirmation</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-8 border-t border-gray-200">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`px-6 py-2 rounded-lg font-medium ${currentStep === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Précédent
                        </button>

                        {currentStep < 3 ? (
                            <button
                                onClick={nextStep}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Suivant
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`px-6 py-2 rounded-lg font-medium ${isSubmitting
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                    } transition-colors`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Publication...</span>
                                    </span>
                                ) : (
                                    "Publier l'annonce"
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
