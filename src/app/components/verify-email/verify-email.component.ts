import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../shared/modeles/user';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  @ViewChild('fform', { static: false }) compteFormDirective: any;
  compteForm: FormGroup;
  nombreSoumission: number = 0;

  compte?: User;
  loading: boolean = false;
  formErrors: any = {
    'email': '',
  };

  validationMessages: any = {
    'email': {
      'required': 'l\'email  est requis.',
      'minlength': 'l\'email  être plus que 4 caractères.',
      'maxlength': 'l\'email l\'auteur ne doit pas être plus que 150 caractères.'
    },
  };

  compteId?: string;
  msgError?: string;
 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.compteForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
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
    this.compte.username = this.compte.email;
    this.authService
        .verifyCompte(this.compte)
        .subscribe(
          user => {
            this.router.navigate(['reset-password/' + user._id]);
          },
          error => { this.msgError = error;},
          ()=>{}
        )
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

  verifyPassword() {
    this.router.navigate(['verify-email'])
  }

}
