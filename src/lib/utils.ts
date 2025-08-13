import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

export function formatSurface(surface: number): string {
    return `${surface} m²`;
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export function formatRelativeDate(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Hier";
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
    if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} semaines`;
    return formatDate(date);
}

export function getPropertyTypeLabel(type: string): string {
    const labels = {
        sale: 'Vente',
        rent: 'Location'
    };
    return labels[type as keyof typeof labels] || type;
}

export function getPropertyCategoryLabel(category: string): string {
    const labels = {
        apartment: 'Appartement',
        house: 'Maison',
        villa: 'Villa',
        studio: 'Studio',
        office: 'Bureau',
        commercial: 'Commercial',
        land: 'Terrain'
    };
    return labels[category as keyof typeof labels] || category;
}

export function getAgentTypeLabel(type: string): string {
    const labels = {
        agency: 'Agence',
        individual: 'Particulier'
    };
    return labels[type as keyof typeof labels] || type;
}

export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}
