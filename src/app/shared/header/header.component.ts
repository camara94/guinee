import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { baseURL } from './../baseurl';
import { VilleService } from './../../services/ville.service';
import { RegionService } from './../../services/region.service';
import { Ville } from './../modeles/ville';
import { Region } from './../modeles/region';
import { Observable } from 'rxjs';
import { Panier } from './../modeles/panier';
import { PanierService } from './../../services/panier.service';
import { NotificationService } from './../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from './../../components/notification/notification.component';
import { ProduitService } from 'src/app/services/produit.service';
import { WebcamsSnapshotComponent } from './../../components/webcams-snapshot/webcams-snapshot.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() navClass: string;
  query: string = ''
  idRegion: string;
  idVille: string;
  notifications: Notification[]=[];

  @Output() panier:Panier;


  baseURL:string = baseURL;
  villes: Ville[] = [];
  pError: any;
  regions: Region[] = [];
  fichier: File;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private villeService: VilleService,
    private regionService: RegionService,
    private panierService: PanierService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private diaglog: MatDialog,
    private produitService: ProduitService
    ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
      }
    });
  }
  isCondensed = false;
  ngAfterViewInit() {
    this._activateMenuDropdown();
  }

  ngOnInit(): void {
    this.panierService
        .getPanier()
        .subscribe(
          panier => this.panier = panier
        )
    
    this.regionService
        .getAllRegions()
        .subscribe(
          regions => this.regions = regions,
          err => this.pError = err,
          () => {}
        );
    this.villeService
        .getAllVilles()
        .subscribe(
          villes => this.villes = villes,
          err => this.pError = err,
          () => {}
        );

        this.notificationService
            .getNotification()
            .subscribe( data => {
              data.map(notif => {
                if(notif){ 
                  this.notifications.push(notif);
                }
              })
            } );
  }

  _activateMenuDropdown() {
    /**
     * Menu activation reset
     */
    const resetParent = (el) => {
      el.classList.remove('active');
      const parent = el.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.remove('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.remove('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              const parent5 = parent4.parentElement;
              parent5.classList.remove('active');
            }
          }
        }
      }
    };

    let links = document.getElementsByClassName('nav-link-ref');
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset menu
      resetParent(links[i]);
    }
    for (let i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i]['pathname']) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active');
      const parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              const parent5 = parent4.parentElement;
              parent5.classList.add('active');
            }
          }
        }
      }
    }
  }

  /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById('topnav').classList.add('nav-sticky');
    } else {
      document.getElementById('topnav').classList.remove('nav-sticky');
    }
    if (document.getElementById('back-to-top')) {
      if (document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100) {
        document.getElementById('back-to-top').style.display = 'inline';
      } else {
        document.getElementById('back-to-top').style.display = 'none';
      }
    }
  }
  /**
   * Toggle menu
   */
  toggleMenu() {
    this.isCondensed = !this.isCondensed;
    if (this.isCondensed) {
      document.getElementById('navigation').style.display = 'block';
    } else {
      document.getElementById('navigation').style.display = 'none';
    }
  }
  /**
   * Menu clicked show the submenu
   */
  onMenuClick(event) {
    event.preventDefault();
    if(event.target.nextSibling != null) {
      const nextEl = event.target.nextSibling.nextSibling;
      
      if (nextEl && !nextEl.classList.contains('open')) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove('open');
        }
        nextEl.classList.add('open');
      } else if (nextEl) {
        nextEl.classList.remove('open');
      }
    }
    return false;
    
  
  
  };

  
  searchProduit(designation, idVille) {
    this.router.navigate(['produits'], { queryParams: { designation: designation, ville: idVille } });
  }

  mesProduits(idUser: string) {
    this.router.navigate(['mes-annonces/' + idUser]);
    this.toggleMenu()
  }

  monProfil() {
    this.router.navigate(['profil/']);
    this.toggleMenu()
  }

  login() {
    this.router.navigate(['login']);
    this.toggleMenu()
  }

  goToAjouterAnnonce() {
    this.router.navigate(['ajouter-annonce']);
    this.toggleMenu();
  }

  logout(): void {
    this.authService.logout();
  }

  getURL(url , path) : string {
    let urlPath = "";
    if(path.indexOf('https') != -1) {
      urlPath = path;
    } else {
      urlPath = url + path;
    }
    return urlPath;
  }

  getVillesByRegion(id: string): Ville[] {
     return this.villes.filter(ville => ville.region == id)
  }

  getNotification(id: string){
    this.router.navigateByUrl('/notifications/' + id);
  }

  gotToNotificationPage(notification: Notification) {
    this.diaglog.open(NotificationComponent, {
      width: "420px",
      height: "198px",
      position: {
        top: "8%"
      },
      data: {
        notification: notification
      }
    })
  }

  onChange(event:any){
    this.fichier = event.target.files[0];
    console.log(this.fichier)
  }

  rechercheProduit(label:string, pourcentage: string, image: string){
    if(label != null && pourcentage != null && image != null)
       this.router.navigate(["recherche/"],{queryParams: {label:label, pourcentage: pourcentage, image: image}})
  }
  
  chercherParFichier() {
    this.produitService
        .rechercheProduit(this.fichier)
        .subscribe(
          response => {
            console.log(response)
            this.rechercheProduit(response.label, response.pourcentage, response?.fichier)
          }
        )
  }

  camera(){
    this.diaglog.open(WebcamsSnapshotComponent, {
      width: '800px',
      height: '600px'
    })
  }
}
