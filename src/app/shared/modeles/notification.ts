import { User } from './user';
import { Produit } from './produit';

export interface Notification {
    _id: string;
    user: User;
    produit: Produit;
    message: string;
    lire: boolean;  
    createdAt: Date;
    updatedAt: Date;
}