import { User } from './user';
export interface DemandeOuvertureBoutique {
    _id: string;
    nom: string;
    phone: string;
    email: string;
    description: string;
    user: User;
  }