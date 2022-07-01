import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../shared/modeles/user';
import { AuthenticationService } from './../../services/authentication.service';
import { matchValidator } from './../sign-up/confirmedValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild('fform', { static: false }) compteFormDirective: any;
  compteForm: FormGroup;

  emailConfirme: string='';

  afficherPassword: boolean = false;

  compte?: User;
  loading: boolean = false;
  formErrors: any = {
    'username': '',
    'confirmPassword':'',
    'password': '',
    'passwordConfirmation':''
    
  };

  validationMessages: any = {
    'confirmPassword': {
      'required': 'la confirmation du mail est requise.',
      'pattern': ''
    },
    'password': {
      'required': 'le mot de passe est requis.',
      'pattern': 'Au moins une majuscule, et chiffre',
      'minlength': ' - le mot de passe être plus que 6 caractères.',
      'maxlength': ' - le mot de passe ne doit pas être plus que 150 caractères.'
    },
    'passwordConfirmation': {
      'required': 'le mot de passe est requis.',
    }
  };

  valeur: string;
  phonePattern = /^((\+|0{2})([0-9]){0,})?[-.●\s]?\(?([0-9]{3})\)?[-.●\s]?([0-9]{3})[-.●\s]?([0-9]{3})$/;
  emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  compteId?: string;
  msgError?: string;
  selectedFile: File;
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.createForm();
  }

  createForm() {
    this.compteForm = this.formBuilder.group({
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
      ]]
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
    this.compte.motDePasse = this.compteForm.value.password;
    
    
    this.authService
        .resetPassword(this.userId, this.compte)
        .subscribe(
          compte => {  
            alert(compte.username + " a été modifié avec succès");
            this.authService.logout();
          },
          err => {},
          () => {
            this.router.navigate(['login'])
            //location.reload();
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

