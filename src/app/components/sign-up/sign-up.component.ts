import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from './../../shared/modeles/user';
import { AuthenticationService } from './../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSuccessComponent } from './../login-success/login-success.component';

import { matchValidator } from './confirmedValidator';

import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('fform', { static: false }) compteFormDirective: any;
  compteForm: FormGroup;

  emailConfirme: string='';

  afficherPassword: boolean = false;
  user: any = {};

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
      'minlength': 'le prénom prend plus que 1 caractères.',
      'maxlength': 'le prénom ne doit pas dépasser 150 caractères.'
    },
    'lastname': {
      'required': 'le nom  est requis.',
      'minlength': 'le nom prend plus que 1 caractères.',
      'maxlength': 'le nom ne doit pas dépasser 150 caractères.'
    },
    'username': {
      'required': 'Le mail  est requis.',
      'pattern': 'Le mail n\'est pas valide ?'
    },
    'confirmPassword': {
      'required': 'la confirmation du mail est requise.',
      'pattern': ''
    },
    'password': {
      'required': 'le mot de passe est requis.',
      'pattern': 'Au moins une majuscule - Au moins un chiffre',
      'minlength': ' - le mot de doit être plus que 6 caractères.',
      'maxlength': ' - le mot de passe ne doit pas dépasser 150 caractères.'
    },
    'passwordConfirmation': {
      'required': 'le mot de passe est requis.',
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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.compteForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      username: ['', [
        Validators.required, 
        Validators.pattern(this.emailPattern)],
        matchValidator('usernameConfirmation', true)
      ],
      usernameConfirmation: ['', 
        [
          Validators.required, 
          matchValidator('username')
        ]
      ],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        matchValidator('confirmPassword', true)
      ]],
      confirmPassword: ['', [
        Validators.required,
        matchValidator('password')
      ]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      gender: '',
      avatar: null
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
    this.compte.email = this.compte.username;

    console.log(this.compte)
    
    this.authService
        .createCompte(this.compte)
        .subscribe(
          compte => {  alert( "Le compte: " + compte.username + " a été crée avec succès") },
          err => {},
          () => {
            this.router.navigate(['login'])
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

  loginWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((socialUser =>{
          this.authService
                .aouth2Facebook(socialUser)
                .subscribe(token => {
                  if(token.token !== undefined)
                  {
                    localStorage.setItem('token',token.token.toString());
                    localStorage.setItem('user', JSON.stringify(jwt_decode(localStorage.getItem('token'))));
                    this.open(token)
                  } else {
                    this.open(token)
                  }
                },
                  err => {
                    this.open(err.error)
                  }
                );
        
      }))
      .catch(err => {this.open(err)})
    }
  
    loginWithGoogle() {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((socialUser =>{
        this.authService
              .aouth2Google(socialUser)
              .subscribe(token => {
                if(token.token !== undefined)
                {
                  localStorage.setItem('token',token.token.toString());
                  localStorage.setItem('user', JSON.stringify(jwt_decode(localStorage.getItem('token'))));
                  this.open(token)
                } else {
                  this.open(token)
                }
              },
                err => {
                  this.open(err.error)
                }
              );
      
    }))
    .catch(err => {this.open(err)})
  }
    
    signOut(): void {
      this.socialAuthService.signOut();
    }
  
    open(err: any) {
      const modalRef = this.modalService.open(
        LoginSuccessComponent, 
        { size: 'md', backdrop: 'static' }
      );
      let data = {
        error: err
      }
  
      modalRef.componentInstance.fromParent = data;
    }

}
