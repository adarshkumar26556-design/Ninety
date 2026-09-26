import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PropertyBrand } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateWhatsAppMessage(
  propertyName: string,
  destination: string,
  roomName?: string,
  whatsappNumber?: string
): string {
  const number = (whatsappNumber || '+919947584947').replace(/\D/g, '');
  let message: string;
  if (roomName) {
    message = `Hi Vilstay Team, I'm interested in the ${roomName} at ${propertyName}, ${destination}. Please share availability and pricing.`;
  } else {
    message = `Hi Vilstay Team, I'm interested in staying at ${propertyName}, ${destination}. Please share availability, room options and pricing.`;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function getBrandColor(brand: PropertyBrand): string {
  switch (brand) {
    case 'Vilstay': return 'brand';
    case 'Vilstay Go': return 'blue';
    case 'Vilstay Venue': return 'purple';
    default: return 'brand';
  }
}

export function getBrandTagClass(brand: PropertyBrand): string {
  switch (brand) {
    case 'Vilstay': return 'brand-tag-vilstay';
    case 'Vilstay Go': return 'brand-tag-go';
    case 'Vilstay Venue': return 'brand-tag-venue';
    default: return 'brand-tag-vilstay';
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trimEnd() + '…';
}
