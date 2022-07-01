import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterPageComponent } from './components/master-page/master-page.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ProduitParCategoryComponent } from './components/produit-par-category/produit-par-category.component';
import { ProduitDetailComponent } from './components/produit-detail/produit-detail.component';
import { SearchProduitComponent } from './components/search-produit/search-produit.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { MesAnnoncesComponent } from './components/mes-annonces/mes-annonces.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { AjouterAnnonceComponent } from './components/ajouter-annonce/ajouter-annonce.component';
import { ModifierAnnonceComponent } from './components/modifier-annonce/modifier-annonce.component';
import { PolitiqueConfidentialiteComponent } from './components/politique-confidentialite/politique-confidentialite.component';
import { ConditionUtilisationComponent } from './components/condition-utilisation/condition-utilisation.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BoutiquesComponent } from './components/boutiques/boutiques.component';
import { MesProduitsComponent } from './components/mes-produits/mes-produits.component';
import { DemandeOuvertureBoutiqueComponent } from './components/demande-ouverture-boutique/demande-ouverture-boutique.component';
import { ConfirmeDemandeComponent } from './components/confirme-demande/confirme-demande.component';
import { ProfilComponent } from './components/profil/profil.component';
import { UpdateProfilComponent } from './components/update-profil/update-profil.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AjouterProduitDansBoutiqueComponent } from './components/ajouter-produit-dans-boutique/ajouter-produit-dans-boutique.component';
import { AideComponent } from './components/aide/aide.component';
import { ListProduitComponent } from './components/list-produit/list-produit.component';
import { MesBoutiquesComponent } from './components/mes-boutiques/mes-boutiques.component';
import { UpdateBoutiqueComponent } from './components/update-boutique/update-boutique.component';
import { PanierComponent } from './components/panier/panier.component';
import { CommanderComponent } from './components/commander/commander.component';
import { ListeCommandeComponent } from './components/liste-commande/liste-commande.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RechercheComponent } from './components/recherche/recherche.component';

const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
 
    children: [
      { path: '', component: AccueilComponent },
      { path: 'categories/:id', component: ProduitParCategoryComponent },
      { path: 'produits/:id', component: ProduitDetailComponent },
      { path: 'produits', component: SearchProduitComponent },
      { path: 'articles', component: ArticleComponent },
      { path: 'login', component: LoginComponent },
      { path: 'mes-annonces/:id', component: MesAnnoncesComponent },
      { path: 'apropos', component: AproposComponent },
      { path: 'ajouter-annonce', component: AjouterAnnonceComponent },
      { path: 'modifier-annonce/:id', component: ModifierAnnonceComponent },
      { path: 'politique-confidentialite', component: PolitiqueConfidentialiteComponent },
      { path: 'condition-utilisation', component: ConditionUtilisationComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'boutiques', component: BoutiquesComponent },
      { path: 'boutiques/:id', component: MesProduitsComponent },
      { path: 'demandes', component: DemandeOuvertureBoutiqueComponent },
      { path: 'confirme-demande', component: ConfirmeDemandeComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'update-profil', component: UpdateProfilComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'reset-password/:id', component: ResetPasswordComponent },
      { path: 'ajouter-dans-boutique/:id', component: AjouterProduitDansBoutiqueComponent },
      { path: 'aides', component: AideComponent },
      { path: 'mes-produits/:id', component: ListProduitComponent },
      { path: 'mes-boutiques', component: MesBoutiquesComponent },
      { path: 'update-boutique/:id', component: UpdateBoutiqueComponent },
      { path: 'ajouter-produit-boutique/:id', component: AjouterProduitDansBoutiqueComponent },
      { path: 'panier', component: PanierComponent  },
      { path: 'commande', component: CommanderComponent  },
      { path: 'liste-commande/:id', component: ListeCommandeComponent },
      { path: 'notifications/:id', component: NotificationComponent },
      { path: 'recherche', component: RechercheComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })
  ],

exports: [RouterModule]
})
export class AppRoutingModule { }
