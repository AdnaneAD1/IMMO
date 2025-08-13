'use client';

import { useState } from 'react';
import { User, Edit3, Save, X, Camera, Mail, Phone, MapPin, Star, Eye, Heart, MessageCircle, Shield, Bell, Lock, CreditCard } from 'lucide-react';

interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    avatar?: string;
    bio: string;
    accountType: 'individual' | 'agency';
    agencyName?: string;
    joinDate: string;
    isVerified: boolean;
}

interface UserStats {
    favoriteProperties: number;
    viewedProperties: number;
    messagesReceived: number;
    averageRating: number;
    totalReviews: number;
}

const mockUserProfile: UserProfile = {
    id: '1',
    firstName: 'Pierre',
    lastName: 'Dubois',
    email: 'pierre.dubois@email.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la République',
    city: 'Lyon',
    postalCode: '69002',
    bio: 'Passionné d\'immobilier depuis plus de 10 ans, je recherche activement ma résidence principale dans la région lyonnaise.',
    accountType: 'individual',
    joinDate: '2023-01-15',
    isVerified: true
};

const mockUserStats: UserStats = {
    favoriteProperties: 12,
    viewedProperties: 245,
    messagesReceived: 34,
    averageRating: 4.8,
    totalReviews: 15
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<UserProfile>(mockUserProfile);
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing'>('profile');

    const handleSave = () => {
        setProfile(editedProfile);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedProfile(profile);
        setIsEditing(false);
    };

    const updateField = (field: keyof UserProfile, value: string) => {
        setEditedProfile(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <User className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
                    </div>
                    <p className="text-gray-600">
                        Gérez vos informations personnelles et vos préférences de compte
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {/* Profile Card */}
                            <div className="p-6 text-center border-b border-gray-200">
                                <div className="relative inline-block">
                                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                                        <User className="h-12 w-12 text-gray-500" />
                                    </div>
                                    <button
                                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                                        aria-label="Changer la photo de profil"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </button>
                                </div>
                                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                                    {profile.firstName} {profile.lastName}
                                </h3>
                                <p className="text-gray-600">{profile.email}</p>
                                {profile.isVerified && (
                                    <div className="mt-2 inline-flex items-center space-x-1 text-green-600">
                                        <Shield className="h-4 w-4" />
                                        <span className="text-sm">Profil vérifié</span>
                                    </div>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="p-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Statistiques</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Heart className="h-4 w-4 text-red-500" />
                                            <span className="text-sm text-gray-600">Favoris</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{mockUserStats.favoriteProperties}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Eye className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm text-gray-600">Vues</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{mockUserStats.viewedProperties}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <MessageCircle className="h-4 w-4 text-green-500" />
                                            <span className="text-sm text-gray-600">Messages</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{mockUserStats.messagesReceived}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <span className="text-sm text-gray-600">Note moyenne</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{mockUserStats.averageRating}/5</span>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="border-t border-gray-200">
                                <nav className="flex flex-col">
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                                            }`}
                                    >
                                        <User className="h-5 w-5" />
                                        <span>Informations personnelles</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('security')}
                                        className={`flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeTab === 'security' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                                            }`}
                                    >
                                        <Lock className="h-5 w-5" />
                                        <span>Sécurité</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('notifications')}
                                        className={`flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                                            }`}
                                    >
                                        <Bell className="h-5 w-5" />
                                        <span>Notifications</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('billing')}
                                        className={`flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeTab === 'billing' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                                            }`}
                                    >
                                        <CreditCard className="h-5 w-5" />
                                        <span>Facturation</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg">
                            {activeTab === 'profile' && (
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-semibold text-gray-900">
                                            Informations personnelles
                                        </h2>
                                        {!isEditing ? (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                                <span>Modifier</span>
                                            </button>
                                        ) : (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleSave}
                                                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    <Save className="h-4 w-4" />
                                                    <span>Sauvegarder</span>
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                                >
                                                    <X className="h-4 w-4" />
                                                    <span>Annuler</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Prénom
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editedProfile.firstName}
                                                    onChange={(e) => updateField('firstName', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Entrez votre prénom"
                                                />
                                            ) : (
                                                <p className="text-gray-900">{profile.firstName}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nom
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editedProfile.lastName}
                                                    onChange={(e) => updateField('lastName', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Entrez votre nom"
                                                />
                                            ) : (
                                                <p className="text-gray-900">{profile.lastName}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Mail className="inline h-4 w-4 mr-1" />
                                                Email
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={editedProfile.email}
                                                    onChange={(e) => updateField('email', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="votre@email.com"
                                                />
                                            ) : (
                                                <p className="text-gray-900">{profile.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Phone className="inline h-4 w-4 mr-1" />
                                                Téléphone
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    value={editedProfile.phone}
                                                    onChange={(e) => updateField('phone', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="+33 6 12 34 56 78"
                                                />
                                            ) : (
                                                <p className="text-gray-900">{profile.phone}</p>
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <MapPin className="inline h-4 w-4 mr-1" />
                                                Adresse
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editedProfile.address}
                                                    onChange={(e) => updateField('address', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="123 Rue de la République"
                                                />
                                            ) : (
                                                <p className="text-gray-900">{profile.address}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ville
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editedProfile.city}
                                                    onChange={(e) => updateField('city', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Entrez votre ville"
                                                />
                                            ) : (
                                                <p className="text-gray-900">{profile.city}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Code postal
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editedProfile.postalCode}
                                                    onChange={(e) => updateField('postalCode', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="69000"
                                                />
                                            ) : (
                                                <p className="text-gray-900">{profile.postalCode}</p>
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Bio
                                            </label>
                                            {isEditing ? (
                                                <textarea
                                                    value={editedProfile.bio}
                                                    onChange={(e) => updateField('bio', e.target.value)}
                                                    rows={4}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Parlez-nous un peu de vous..."
                                                />
                                            ) : (
                                                <p className="text-gray-900">{profile.bio}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                        Sécurité et confidentialité
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2">Mot de passe</h3>
                                            <p className="text-gray-600 mb-4">
                                                Modifiez votre mot de passe régulièrement pour sécuriser votre compte
                                            </p>
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                Changer le mot de passe
                                            </button>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2">Authentification à deux facteurs</h3>
                                            <p className="text-gray-600 mb-4">
                                                Ajoutez une couche de sécurité supplémentaire à votre compte
                                            </p>
                                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                                Activer
                                            </button>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2">Sessions actives</h3>
                                            <p className="text-gray-600 mb-4">
                                                Gérez les appareils connectés à votre compte
                                            </p>
                                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                                Déconnecter tous les appareils
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                        Préférences de notifications
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Nouvelles propriétés</h3>
                                                <p className="text-gray-600">Recevoir des notifications pour les nouvelles propriétés</p>
                                            </div>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                    defaultChecked
                                                    aria-label="Activer les notifications de nouvelles propriétés"
                                                />
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Messages</h3>
                                                <p className="text-gray-600">Recevoir des notifications pour les nouveaux messages</p>
                                            </div>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                    defaultChecked
                                                    aria-label="Activer les notifications de messages"
                                                />
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Alertes de prix</h3>
                                                <p className="text-gray-600">Recevoir des alertes de changement de prix</p>
                                            </div>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                    aria-label="Activer les alertes de prix"
                                                />
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Newsletter</h3>
                                                <p className="text-gray-600">Recevoir notre newsletter hebdomadaire</p>
                                            </div>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                    defaultChecked
                                                    aria-label="Activer la newsletter"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'billing' && (
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                        Facturation et abonnements
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2">Plan actuel</h3>
                                            <p className="text-gray-600 mb-4">
                                                Compte gratuit - Accès limité aux fonctionnalités premium
                                            </p>
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                Passer au premium
                                            </button>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2">Historique de facturation</h3>
                                            <p className="text-gray-600 mb-4">
                                                Consultez et téléchargez vos factures
                                            </p>
                                            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                                Voir l&apos;historique
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
