import Link from 'next/link';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo et description */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Home className="h-8 w-8 text-blue-400" />
                            <span className="text-2xl font-bold">ImmoMarket</span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            La marketplace immobilière qui connecte particuliers et agences pour des transactions transparentes et sécurisées.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/properties" className="text-gray-400 hover:text-white transition-colors">
                                    Toutes les annonces
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties?type=sale" className="text-gray-400 hover:text-white transition-colors">
                                    Acheter
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties?type=rent" className="text-gray-400 hover:text-white transition-colors">
                                    Louer
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties/create" className="text-gray-400 hover:text-white transition-colors">
                                    Publier une annonce
                                </Link>
                            </li>
                            <li>
                                <Link href="/agents" className="text-gray-400 hover:text-white transition-colors">
                                    Professionnels
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/premium" className="text-gray-400 hover:text-white transition-colors">
                                    Offres Premium
                                </Link>
                            </li>
                            <li>
                                <Link href="/estimation" className="text-gray-400 hover:text-white transition-colors">
                                    Estimation gratuite
                                </Link>
                            </li>
                            <li>
                                <Link href="/guides" className="text-gray-400 hover:text-white transition-colors">
                                    Guides immobiliers
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="text-gray-400 hover:text-white transition-colors">
                                    Support client
                                </Link>
                            </li>
                            <li>
                                <Link href="/api" className="text-gray-400 hover:text-white transition-colors">
                                    API Développeurs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-400">
                                <Mail className="h-5 w-5" />
                                <span>contact@immomarket.fr</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400">
                                <Phone className="h-5 w-5" />
                                <span>01 23 45 67 89</span>
                            </div>
                            <div className="flex items-start space-x-3 text-gray-400">
                                <MapPin className="h-5 w-5 mt-0.5" />
                                <span>123 Avenue des Champs-Élysées<br />75008 Paris, France</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ligne de séparation */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-400">
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Conditions d&apos;utilisation
                            </Link>
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Politique de confidentialité
                            </Link>
                            <Link href="/cookies" className="hover:text-white transition-colors">
                                Cookies
                            </Link>
                            <Link href="/legal" className="hover:text-white transition-colors">
                                Mentions légales
                            </Link>
                        </div>
                        <div className="text-sm text-gray-400">
                            © 2024 ImmoMarket. Tous droits réservés.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
