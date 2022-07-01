import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { Produit } from './../../shared/modeles/produit';
import { ProduitService } from './../../services/produit.service';
import { Category } from './../../shared/modeles/category';
import { CategoryService } from 'src/app/services/category.service';
import { Ville } from './../../shared/modeles/ville';
import { VilleService } from './../../services/ville.service';

@Component({
  selector: 'app-modifier-annonce',
  templateUrl: './modifier-annonce.component.html',
  styleUrls: ['./modifier-annonce.component.css']
})
export class ModifierAnnonceComponent implements OnInit {

  
  @ViewChild('fform', { static: false }) annonceFormDirective: any;
  annonceForm: FormGroup;
  images: FormArray;

  categories: Category[] = [];

  selectedFiles: File[] = [];
  villes: Ville[] = [];

  idAnnonce: string = '';

  annonce: any;
  annonneModifier: Produit;
  produit: Produit;
  loading: boolean = false;
  formErrors: any = {
    'designation': '',
    'couleurs': '',
    'tailles': '',
    'description': '',
    'quantite': 0,
    'prix': 0,
    'category': '',
    'adresse': '',
    
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

  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProduitService,
    private categoryService: CategoryService,
    private villeService: VilleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    
    this.idAnnonce = this.route.snapshot.paramMap.get('id');

    this.categoryService
        .getAllCategories()
        .subscribe(
          categories => {
            this.categories = categories;
          }
        )

    this.produitService
        .getProduitId(this.idAnnonce)
        .subscribe( 
            annonce => {
              this.annonneModifier = annonce;
              console.log(annonce)
              this.createForm(annonce);
            }   
         );
    
    this.villeService
        .getAllVilles()
        .subscribe(
          villes => this.villes = villes,
          err => {},
          () => {}
        )
  }

  createForm(annonneModifier) {
    this.annonceForm = this.formBuilder.group({
      designation: [annonneModifier.designation, [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      description: [annonneModifier.description, [Validators.required, Validators.minLength(4)]],
      category: [annonneModifier.category, [Validators.required]],
      tailles: '',
      couleurs: '',
      fichiers: this.formBuilder.array([this.createImage()]),
      prix: annonneModifier.prix,
      quantite: annonneModifier.quantite,
      adresse: annonneModifier.adresse
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
    

    let usernamewithoutAt = JSON.parse(localStorage.getItem('user')).username.substr(0, JSON.parse(localStorage.getItem('user')).username.indexOf('@'))
    
    data.prix = this.annonceForm.value.prix;
    data.quantite = this.annonceForm.value.quantite;
    data.adresse = this.annonceForm.value.adresse;
    data.category = this.annonceForm.value.category;
    data.user = {
      _id: JSON.parse(localStorage.getItem('user'))._id
    }
    data.tailles = this.annonceForm.value.tailles.indexOf(',')>=0? this.annonceForm.value.tailles.split(','): this.annonceForm.value.tailles.split(' ');
    data.coluleurs = this.annonceForm.value.tailles.indexOf(',')>=0? this.annonceForm.value.couleurs.split(' '): this.annonceForm.value.couleurs.split(' ');
    
    if(this.selectedFiles.length > 1)
    {
      data.images = [];
      for(let i=0; i < this.selectedFiles.length; i++) {
        let fd: FormData = new FormData();
        data.images.push( 'images/' + usernamewithoutAt + '/' +  this.selectedFiles[i].name)
      };

      this.selectedFiles.forEach(file => {
        this.produitService
            .telecharger(file)
            .subscribe(
              file => {}
            )
      })
  
    }

    this.produitService
        .updateProduit(this.idAnnonce, data)
        .subscribe(
          produit => {
            this.produit = produit;
            this.router.navigate(['produits/' + this.idAnnonce]);
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
