import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgxMasonryModule } from 'ngx-masonry';
import { ScrollspyDirective } from './shared/scrollspy.directive'


import { FeatherModule } from 'angular-feather';

import { allIcons } from 'angular-feather/icons';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SwitcherComponent } from './shared/switcher/switcher.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HighlightDirective } from 'src/directives/highlight.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ArticleComponent } from './components/article/article.component';
import { ProduitDetailComponent } from './components/produit-detail/produit-detail.component';
import { ProduitParCategoryComponent } from './components/produit-par-category/produit-par-category.component';
import { SearchProduitComponent } from './components/search-produit/search-produit.component';
import { MasterPageComponent } from './components/master-page/master-page.component';
import { LoginComponent } from './components/login/login.component';
import { baseURL } from './shared/baseurl';
import { JwtTokenInterceptorInterceptor } from './services/jwt-token-interceptor.interceptor';
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
import { DeleteCompteComponent } from './components/delete-compte/delete-compte.component';
import { AjouterProduitDansBoutiqueComponent } from './components/ajouter-produit-dans-boutique/ajouter-produit-dans-boutique.component';
import { AideComponent } from './components/aide/aide.component';
import { SafePipe } from './mes-pipe/safe.pipe';
import {MatDialogModule} from '@angular/material/dialog';



import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { PrixPipe } from './mes-pipe/prix.pipe';
import { ListProduitComponent } from './components/list-produit/list-produit.component';
import { MesBoutiquesComponent } from './components/mes-boutiques/mes-boutiques.component';
import { UpdateBoutiqueComponent } from './components/update-boutique/update-boutique.component';
import { AjouterProduitBoutiqueComponent } from './components/ajouter-produit-boutique/ajouter-produit-boutique.component';
import { SupprimerProduitComponent } from './components/supprimer-produit/supprimer-produit.component';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { PanierComponent } from './components/panier/panier.component';
import { CommanderComponent } from './components/commander/commander.component';
import { SupprimerPanierComponent } from './components/supprimer-panier/supprimer-panier.component';
import { ListeCommandeComponent } from './components/liste-commande/liste-commande.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmationCommandeComponent } from './components/confirmation-commande/confirmation-commande.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { WebcamsSnapshotComponent } from './components/webcams-snapshot/webcams-snapshot.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SwitcherComponent,
    ScrollspyDirective,
    HighlightDirective,
    AccueilComponent,
    ArticleComponent,
    ProduitDetailComponent,
    ProduitParCategoryComponent,
    SearchProduitComponent,
    MasterPageComponent,
    LoginComponent,
    MesAnnoncesComponent,
    AproposComponent,
    AjouterAnnonceComponent,
    ModifierAnnonceComponent,
    PolitiqueConfidentialiteComponent,
    ConditionUtilisationComponent,
    SignUpComponent,
    BoutiquesComponent,
    MesProduitsComponent,
    DemandeOuvertureBoutiqueComponent,
    ConfirmeDemandeComponent,
    ProfilComponent,
    UpdateProfilComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    DeleteCompteComponent,
    AjouterProduitDansBoutiqueComponent,
    AideComponent,
    SafePipe,
    LoginSuccessComponent,
    PrixPipe,
    ListProduitComponent,
    MesBoutiquesComponent,
    UpdateBoutiqueComponent,
    AjouterProduitBoutiqueComponent,
    SupprimerProduitComponent,
    PanierComponent,
    CommanderComponent,
    SupprimerPanierComponent,
    ListeCommandeComponent,
    NotificationComponent,
    ConfirmationCommandeComponent,
    RechercheComponent,
    WebcamsSnapshotComponent 
  ],
  imports: [
    MDBBootstrapModulesPro.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    CarouselModule,
    FeatherModule.pick(allIcons),
    ScrollToModule.forRoot(),
    RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
    NgxYoutubePlayerModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxTypedJsModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgxMasonryModule,
    HttpClientModule,
    FormsModule,
    MatProgressBarModule,
    SocialLoginModule,
    MatDialogModule
  ],
  providers: [
    MDBSpinningPreloader,
    { provide: 'BaseURL', useValue: baseURL },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptorInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('512475229885744'),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('176532190111-i0hgj1d8o2bt7t5en8gahp1tnccfhn7t.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  exports: [
    FeatherModule,
    ScrollspyDirective,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
