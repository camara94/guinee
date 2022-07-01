import { Produit } from './produit';
export interface LigneCommande {
    _id: string;
    produit: Produit;
    quantite: number;
    livrer: boolean;
    commander: boolean;
}