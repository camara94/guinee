import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from './../../shared/modeles/user';
import { AuthenticationService } from './../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSuccessComponent } from './../login-success/login-success.component';

import {
  SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('fform', { static: false }) compteFormDirective: any;
  compteForm: FormGroup;
  nombreSoumission: number = 0;

  user: any={};

  compte?: User;
  loading: boolean = false;
  formErrors: any = {
    'username': '',
    'password': ''
  };

  validationMessages: any = {
    'username': {
      'required': 'l\'email est requis.',
      'minlength': 'l\'email doit être plus que 4 caractères.',
      'maxlength': 'l\'email ne doit pas dépasser que 150 caractères.',
      'email': 'l\'email n\'est pas valide!'
    },
    'password': {
      'required': 'le mot de passe est requis.',
      'minlength': 'le mot de passe doit être plus que 6 caractères.',
      'maxlength': 'le mot de passe ne doit pas dépasser 150 caractères.'
    }
  };

  compteId?: string;
  msgError?: string;

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
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]]
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
    this.authService
        .login(this.compte)
        .subscribe(
          token => {
            localStorage.setItem('token',token.token.toString());
            localStorage.setItem('user', JSON.stringify(jwt_decode(localStorage.getItem('token'))));
            this.router.navigateByUrl('/');
            setTimeout(()=>{
              location.reload()
            }, 1000)
          },
          error => {this.nombreSoumission++;},
          ()=>{}
        )
    //this.compteFormDirective.resetForm();
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

  verifyPassword() {
    this.router.navigate(['verify-email'])
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
