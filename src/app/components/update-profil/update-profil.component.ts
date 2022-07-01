import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../shared/modeles/user';
import { AuthenticationService } from './../../services/authentication.service';
import { matchValidator } from './../sign-up/confirmedValidator';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.css']
})
export class UpdateProfilComponent implements OnInit {

  
  @ViewChild('fform', { static: false }) compteFormDirective: any;
  compteForm: FormGroup;

  emailConfirme: string='';

  afficherPassword: boolean = false;

  compte?: User;
  loading: boolean = false;
  formErrors: any = {
    'firstname': '',
    'lastname': '',
    'phone': '',
    'gender':'',
    'username': '',
    'confirmPassword':'',
    'password': '',
    'passwordConfirmation':''
    
  };

  validationMessages: any = {
    'firstname': {
      'required': 'le prénom  est requis.',
      'minlength': 'le prénom être plus que 4 caractères.',
      'maxlength': 'le nom l\'auteur ne doit pas être plus que 150 caractères.'
    },
    'lastname': {
      'required': 'le nom  est requis.',
      'minlength': 'le nom être plus que 4 caractères.',
      'maxlength': 'le nom l\'auteur ne doit pas être plus que 150 caractères.'
    },
    'username': {
      'required': 'Le mail  est requis.',
      'pattern': 'Le mail n\est pas valide ?'
    },
    'phone': {
      'required': 'le numéro de téléphone est requis.',
      'pattern': 'le numéro de téléphone n\'est pas valide ?'
    }
  };

  valeur: string;
  phonePattern = /^((\+|0{2})([0-9]){0,})?[-.●\s]?\(?([0-9]{3})\)?[-.●\s]?([0-9]{3})[-.●\s]?([0-9]{3})$/;
  emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  compteId?: string;
  msgError?: string;
  selectedFile: File;
  user: User;
  userErr: any;
  oldCompte: User;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let idUser = JSON.parse(localStorage.getItem('user'))._id;
    
    this.authService
        .getCompteById(idUser)
        .subscribe(
          compte => { this.oldCompte = compte; this.createForm();}
        )
    //this.createForm();
    
  }

  createForm() {
    this.compteForm = this.formBuilder.group({
      firstname: [this.authService.user.firstname, [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      lastname: [this.authService.user.lastname, [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      phone: [this.oldCompte.phone, [Validators.required, Validators.pattern(this.phonePattern)]],
      gender: this.oldCompte.adresse,
      avatar: null,
      adresse: this.oldCompte.adresse
    });
    this.compteForm
      .valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.compteForm) { return; }
    const form = this.compteForm;
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
    this.compte = this.compteForm.value;
    this.compte.email = this.authService.user.email;
    this.compte.username = this.authService.user.username;

    if(this.selectedFile !== undefined) {
      this.compte.avatar =  (this.compte.username.indexOf('@')>0) ?
                                           'images/' + this.compte.username.substr(0, this.compte.username.indexOf('@')) + '/' + this.selectedFile.name
                                           :
                                           'images/' + this.compte.username + '/' + this.selectedFile.name;
      this.authService
          .telecharger(this.selectedFile) 
          .subscribe(file=>{})
    } else {
      this.compte.avatar = this.authService.user.avatar;
    }

    this.authService
          .updateCompte(this.compte)
          .subscribe(
            compte => {  alert( "Le compte: " + compte.username + " a été crée avec succès") },
            err => {},
            () => {
              this.router.navigate(['profil'])
            }
          );
    
    this.compteFormDirective.resetForm();
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

  afficherMotDePasse(){
    this.afficherPassword = true
  }

  masquerMotDePasse(){
    this.afficherPassword = false
  }

  
  fileChanged(event: any) {
      this.selectedFile = event.target.files[0];
  }
}

