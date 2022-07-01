import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { Produit } from './../../shared/modeles/produit';
import { ProduitService } from './../../services/produit.service';
import { Category } from './../../shared/modeles/category';
import { CategoryService } from 'src/app/services/category.service';
import { VilleService } from './../../services/ville.service';
import { Ville } from './../../shared/modeles/ville';
import { BoutiqueService } from './../../services/boutique.service';
import { Boutique } from './../../shared/modeles/boutique';
import { User } from './../../shared/modeles/user';

@Component({
  selector: 'app-ajouter-produit-dans-boutique',
  templateUrl: './ajouter-produit-dans-boutique.component.html',
  styleUrls: ['./ajouter-produit-dans-boutique.component.css']
})
export class AjouterProduitDansBoutiqueComponent implements OnInit {
  
  @ViewChild('fform', { static: false }) annonceFormDirective: any;
  annonceForm: FormGroup;
  images: FormArray;

  categories: Category[] = [];

  villes: Ville[];

  selectedFiles: File[] = [];
  idBoutique: string;

  annonce: any;
  produit?: Produit;
  loading: boolean = false;
  formErrors: any = {
    'designation': '',
    'couleurs': '',
    'tailles': '',
    'description': '',
    'quantite': 0,
    'prix': 0,
    'category': '',
    'adresse': ''
  };

  validationMessages: any = {
    'designation': {
      'required': 'le titre de l\'annonce est requis.',
      'minlength': 'le titre de l\'annonce doit être plus que 4 caractères.',
      'maxlength': 'le titre de l\'annonce ne doit pas être plus que 150 caractères.'
    },
    'description': {
      'required': 'la description de l\'annonce est requise.',
      'minlength': 'la description de l\'annonce doit être plus que 4 caractères.'
    },
    'category': {
      'required': 'la catégorie de l\'annonce est requise.'
    }
  };

  annonceId?: string;
  msgError?: string;

  boutique: Boutique;
  erreur: any;

  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private categoryService: CategoryService,
    private villeService: VilleService,
    private boutiqueService: BoutiqueService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log("Laby Damaro")
    this.idBoutique = this.route.snapshot.paramMap.get('id');
    console.log(this.idBoutique)

    this.boutiqueService
        .getBoutiqueById(this.idBoutique)
        .subscribe(
          boutique => this.boutique = boutique,
          erreur => this.erreur = erreur
        )

    this.categoryService
        .getAllCategories()
        .subscribe(
          categories => {
            this.categories = categories;
          }
        )
    
    this.villeService
        .getAllVilles()
        .subscribe(
          villes => this.villes = villes,
          err => {},
          () => {}
        )
        
    this.createForm();
  }

  createForm() {
    this.annonceForm = this.formBuilder.group({
      designation: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required]],
      tailles: '',
      couleurs: [],
      fichiers: this.formBuilder.array([this.createImage()]),
      prix: 0,
      quantite: 1,
      adresse: '',
      contact: '',
      ville: ''
    });
    this.annonceForm
      .valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.annonceForm) { return; }
    const form = this.annonceForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    //this.annonceForm.value = this.annonceForm.valueForm.value;
    
    let data: any = {}
    data.designation = this.annonceForm.value.designation;
    data.description = this.annonceForm.value.description;
    data.boutique = this.boutique;
    data.images = [];

    let usernamewithoutAt = JSON.parse(localStorage.getItem('user')).username.substr(0, JSON.parse(localStorage.getItem('user')).username.indexOf('@'))
    for(let i=0; i < this.selectedFiles.length; i++) {
      let fd: FormData = new FormData();
      data.images.push( 'images/' + usernamewithoutAt + '/' +  this.selectedFiles[i].name)
    };
    data.prix = this.annonceForm.value.prix;
    data.quantite = this.annonceForm.value.quantite;
    data.adresse = this.annonceForm.value.adresse;
    data.category = this.annonceForm.value.category;
    data.contact = this.annonceForm.value.contact;
    data.user = {
      _id: (JSON.parse(localStorage.getItem('user')) as User)._id
    }
    if(this.annonceForm.value.tailles != null) {
      data.tailles = this.annonceForm.value.tailles.indexOf(',')>=0? this.annonceForm.value.tailles.split(','): this.annonceForm.value.tailles.split(' ');
    }
    if (this.annonceForm.value.couleurs != null) {
      data.coluleurs = this.annonceForm.value.couleurs.indexOf(',')>=0? this.annonceForm.value.couleurs.split(' '): this.annonceForm.value.couleurs.split(' ');
    }


    this.selectedFiles.forEach(file => {
      this.produitService
          .telecharger(file)
          .subscribe(
            file => {}
          )
    })

    this.produitService
        .createProduit(data)
        .subscribe(
          produit => {
            this.produit = produit;
            this.router.navigate(['mes-annonces/'+JSON.parse(localStorage.getItem('user'))._id]);
          }
        )
    this.annonceFormDirective.resetForm();
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }


  get imagesDetails() {
    return (this.annonceForm.controls.images as FormGroup).controls;
  }

  get imageFormGroups() {
    return this.annonceForm.get('fichiers') as FormArray
  }

  createImage(): FormGroup {
    return this.formBuilder.group({
      image: ''
    });
  }

  fileChanged(event: any) {
    this.selectedFiles.push(event.target.files[0]);
  }

  addItem(): void {
    if((this.annonceForm.get('fichiers') as FormArray).length<3) {
      this.images = this.annonceForm.get('fichiers') as FormArray;
      this.images.push(this.createImage());
    } else {
      alert("Vous ne pouvez pas depasser trois images par annonces");
    }
  }

}
