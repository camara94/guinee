import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Boutique } from './../../shared/modeles/boutique';
import { BoutiqueService } from './../../services/boutique.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import jwt_decode from 'jwt-decode';
import { baseURL } from './../../shared/baseurl';


@Component({
  selector: 'app-update-boutique',
  templateUrl: './update-boutique.component.html',
  styleUrls: ['./update-boutique.component.css']
})
export class UpdateBoutiqueComponent implements OnInit {

  @ViewChild('fform', { static: false }) boutiqueFormDirective: any;
  boutiqueForm: FormGroup;
 


  selectedFile: File;
  

  idBoutique: string = '';

  boutiqueModifier: Boutique;
  boutique: Boutique;
  loading: boolean = false;
  formErrors: any = {
    'nom': '',
    'description': '',
    'phone': 0,
    'pageFacebook': '',
    'pageLinkedin': '',
    'adresse': ''
  };

  validationMessages: any = {
    'nom': {
      'required': 'le nom de la boutique est requis.',
      'minlength': 'le nom de la boutique doit être plus que 4 caractères.',
      'maxlength': 'le nom de la boutique ne doit pas être plus que 150 caractères.'
    },
    'description': {
      'required': 'la description de la boutique est requise.',
      'minlength': 'la description de la boutique doit être plus que 4 caractères.'
    },
    'phone': {
      'required': 'le téléphone de la boutique est requise.'
    }
  };

  annonceId?: string;
  msgError?: string;
  baseURL: string = baseURL;

  constructor(
    private formBuilder: FormBuilder,
    private boutiqueService: BoutiqueService,
    private produitService: ProduitService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    
    this.idBoutique = this.route.snapshot.params['id'];

    this.boutiqueService
        .getBoutiqueById(this.idBoutique)
        .subscribe( 
            annonce => {
              this.boutiqueModifier = annonce;
              console.log(this.boutiqueModifier)
              this.createForm(this.boutiqueModifier);
            }   
         );
  }

  createForm(boutiqueModifier: Boutique) {
    this.boutiqueForm = this.formBuilder.group({
      nom: [boutiqueModifier.nom, [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      description: [this.boutiqueModifier.description, [Validators.required, Validators.minLength(4)]],
      email: boutiqueModifier.email,
      pageFacebook: boutiqueModifier.pageFacebook,
      pageLinkedin: boutiqueModifier.pageLinkedin,
      phone: boutiqueModifier.phone,
      adresse: boutiqueModifier.adresse
    });
    this.boutiqueForm
      .valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.boutiqueForm) { return; }
    const form = this.boutiqueForm;
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
    this.boutique = this.boutiqueForm.value;
    

    let usernamewithoutAt = JSON.parse(localStorage.getItem('user')).username.substr(0, JSON.parse(localStorage.getItem('user')).username.indexOf('@'))
    
    
    if(this.selectedFile?.name != null)
    {
     
        this.boutique.image = 'images/' + usernamewithoutAt + '/' +  this.selectedFile.name;

        this.produitService
            .telecharger(this.selectedFile)
            .subscribe(
              file => {}
            )
  
    }

    this.boutiqueService
        .updateBoutique(this.idBoutique, this.boutique)
        .subscribe(
          boutique => {
            this.boutique = boutique;
            this.router.navigate(['mes-boutiques']);
          }
        )
    this.boutiqueFormDirective.resetForm();
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




  fileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }
}
