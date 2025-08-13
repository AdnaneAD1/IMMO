'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, Home, Heart, MessageCircle, User, Plus } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Home className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">ImmoMarket</span>
                    </Link>

                    {/* Barre de recherche desktop */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Rechercher une ville, un quartier..."
                                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Navigation desktop */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/properties"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Annonces
                        </Link>
                        <Link
                            href="/favorites"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
                        >
                            <Heart className="h-4 w-4" />
                            <span>Favoris</span>
                        </Link>
                        <Link
                            href="/messages"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span>Messages</span>
                        </Link>
                        <Link
                            href="/profile"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
                        >
                            <User className="h-4 w-4" />
                            <span>Profil</span>
                        </Link>
                        <Link
                            href="/properties/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Publier</span>
                        </Link>
                    </nav>

                    {/* Menu burger mobile */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-gray-700" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Barre de recherche mobile */}
                <div className="md:hidden pb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Menu mobile */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <nav className="space-y-2">
                            <Link
                                href="/properties"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Annonces
                            </Link>
                            <Link
                                href="/favorites"
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Heart className="h-4 w-4" />
                                <span>Favoris</span>
                            </Link>
                            <Link
                                href="/messages"
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <MessageCircle className="h-4 w-4" />
                                <span>Messages</span>
                            </Link>
                            <Link
                                href="/profile"
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="h-4 w-4" />
                                <span>Profil</span>
                            </Link>
                            <Link
                                href="/properties/create"
                                className="block mx-4 mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Publier une annonce
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
