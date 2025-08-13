'use client';

import { useState } from 'react';
import { MessageCircle, Search, Send, Paperclip, MoreVertical, Phone, Video, User, Building } from 'lucide-react';

interface Message {
    id: string;
    content: string;
    timestamp: string;
    isOwn: boolean;
    isRead: boolean;
}

interface Conversation {
    id: string;
    participant: {
        name: string;
        type: 'agency' | 'individual';
        avatar?: string;
        isOnline: boolean;
    };
    property: {
        title: string;
        image: string;
        price: string;
    };
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    messages: Message[];
}

const mockConversations: Conversation[] = [
    {
        id: '1',
        participant: {
            name: 'Sophie Martin',
            type: 'agency',
            isOnline: true,
        },
        property: {
            title: 'Appartement T3 lumineux avec balcon',
            image: '/api/placeholder/80/60',
            price: '285 000 €'
        },
        lastMessage: 'Bonjour, la visite est-elle toujours prévue demain ?',
        lastMessageTime: '14:30',
        unreadCount: 2,
        messages: [
            {
                id: '1',
                content: 'Bonjour, je suis intéressé par votre appartement T3.',
                timestamp: '14:15',
                isOwn: true,
                isRead: true
            },
            {
                id: '2',
                content: 'Bonjour ! Merci pour votre intérêt. Souhaitez-vous organiser une visite ?',
                timestamp: '14:20',
                isOwn: false,
                isRead: true
            },
            {
                id: '3',
                content: 'Oui, avec plaisir. Êtes-vous disponible cette semaine ?',
                timestamp: '14:25',
                isOwn: true,
                isRead: true
            },
            {
                id: '4',
                content: 'Parfait ! Je peux vous proposer demain à 15h ou jeudi à 10h.',
                timestamp: '14:28',
                isOwn: false,
                isRead: true
            },
            {
                id: '5',
                content: 'Demain à 15h me convient parfaitement.',
                timestamp: '14:29',
                isOwn: true,
                isRead: true
            },
            {
                id: '6',
                content: 'Bonjour, la visite est-elle toujours prévue demain ?',
                timestamp: '14:30',
                isOwn: false,
                isRead: false
            }
        ]
    },
    {
        id: '2',
        participant: {
            name: 'Jean Dupont',
            type: 'individual',
            isOnline: false,
        },
        property: {
            title: 'Maison individuelle avec jardin',
            image: '/api/placeholder/80/60',
            price: '450 000 €'
        },
        lastMessage: 'D\'accord, à bientôt !',
        lastMessageTime: 'Hier',
        unreadCount: 0,
        messages: []
    },
    {
        id: '3',
        participant: {
            name: 'Agence Centrale',
            type: 'agency',
            isOnline: true,
        },
        property: {
            title: 'Villa moderne avec piscine',
            image: '/api/placeholder/80/60',
            price: '850 000 €'
        },
        lastMessage: 'Les photos supplémentaires sont disponibles.',
        lastMessageTime: 'Lundi',
        unreadCount: 1,
        messages: []
    }
];

export default function MessagesPage() {
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = mockConversations.filter(conversation =>
        conversation.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return;

        const message: Message = {
            id: Date.now().toString(),
            content: newMessage,
            timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            isOwn: true,
            isRead: false
        };

        selectedConversation.messages.push(message);
        setNewMessage('');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <MessageCircle className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
                    </div>
                    <p className="text-gray-600">
                        Communiquez directement avec les propriétaires et agents immobiliers
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[700px] flex">
                    {/* Liste des conversations */}
                    <div className="w-1/3 border-r border-gray-200 flex flex-col">
                        {/* Recherche */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher une conversation..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Conversations */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredConversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    onClick={() => setSelectedConversation(conversation)}
                                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                                        }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                {conversation.participant.type === 'agency' ? (
                                                    <Building className="h-6 w-6 text-gray-500" />
                                                ) : (
                                                    <User className="h-6 w-6 text-gray-500" />
                                                )}
                                            </div>
                                            {conversation.participant.isOnline && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-semibold text-gray-900 truncate">
                                                    {conversation.participant.name}
                                                </h3>
                                                <span className="text-xs text-gray-500">
                                                    {conversation.lastMessageTime}
                                                </span>
                                            </div>

                                            <p className="text-xs text-blue-600 truncate mb-1">
                                                {conversation.property.title}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-gray-600 truncate flex-1">
                                                    {conversation.lastMessage}
                                                </p>
                                                {conversation.unreadCount > 0 && (
                                                    <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                                        {conversation.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Zone de conversation */}
                    <div className="flex-1 flex flex-col">
                        {selectedConversation ? (
                            <>
                                {/* Header de la conversation */}
                                <div className="p-4 border-b border-gray-200 bg-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                    {selectedConversation.participant.type === 'agency' ? (
                                                        <Building className="h-5 w-5 text-gray-500" />
                                                    ) : (
                                                        <User className="h-5 w-5 text-gray-500" />
                                                    )}
                                                </div>
                                                {selectedConversation.participant.isOnline && (
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {selectedConversation.participant.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {selectedConversation.participant.isOnline ? 'En ligne' : 'Hors ligne'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                aria-label="Appeler"
                                            >
                                                <Phone className="h-5 w-5" />
                                            </button>
                                            <button
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                aria-label="Appel vidéo"
                                            >
                                                <Video className="h-5 w-5" />
                                            </button>
                                            <button
                                                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                                                aria-label="Plus d'options"
                                            >
                                                <MoreVertical className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Info propriété */}
                                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-9 bg-gray-200 rounded"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {selectedConversation.property.title}
                                                </p>
                                                <p className="text-sm text-blue-600 font-semibold">
                                                    {selectedConversation.property.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {selectedConversation.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isOwn
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-200 text-gray-900'
                                                    }`}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                                <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'
                                                    }`}>
                                                    {message.timestamp}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Zone de saisie */}
                                <div className="p-4 border-t border-gray-200 bg-white">
                                    <div className="flex items-center space-x-3">
                                        <button
                                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            aria-label="Joindre un fichier"
                                        >
                                            <Paperclip className="h-5 w-5" />
                                        </button>

                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                placeholder="Tapez votre message..."
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <button
                                            onClick={sendMessage}
                                            disabled={!newMessage.trim()}
                                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                            aria-label="Envoyer le message"
                                        >
                                            <Send className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Sélectionnez une conversation
                                    </h3>
                                    <p className="text-gray-600">
                                        Choisissez une conversation dans la liste pour commencer à discuter
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
