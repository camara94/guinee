import { User } from './user';
import { LigneCommande } from './ligneCommande';

export interface Panier {
    _id: string;
    user: User;
    ligneCommandes:LigneCommande[];
    commander: boolean;
}