import { User } from './user';
import { Ville } from './ville';
import { Boutique } from './boutique';
export interface Produit{
    designation: string;
    couleurs: string[];
    tailles: string[];
    description: string;
    quantite: number;
    disponible: boolean;
    images: string[];
    _id: string;
    boutique: Boutique;
    prix: number;
    user: User;
    category: string;
    ville: Ville;
    adresse: string;
    createdAt: string;
    updatedAt: string;
  }