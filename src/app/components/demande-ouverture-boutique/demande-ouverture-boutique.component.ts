import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DemandeOuvertureBoutiqueService } from './../../services/demande-ouverture-boutique.service';
import { Router } from '@angular/router';
import { DemandeOuvertureBoutique } from './../../shared/modeles/demandeOuvertureBoutique';

@Component({
  selector: 'app-demande-ouverture-boutique',
  templateUrl: './demande-ouverture-boutique.component.html',
  styleUrls: ['./demande-ouverture-boutique.component.css']
})
export class DemandeOuvertureBoutiqueComponent implements OnInit {

  @ViewChild('fform', { static: false }) demandeOuvertureBoutiqueFormDirective: any;
  demandeOuvertureBoutiqueForm: FormGroup;

  demandeOuvertureBoutique: DemandeOuvertureBoutique;
  loading: boolean = false;
  formErrors: any = {
    'nom': '',
    'description': '',
    'phone': '',
    'email':''
  };

  validationMessages: any = {
    'nom': {
      'required': 'le nom de la boutique est requis.',
      'minlength': 'le nom de la boutique être plus que 4 caractères.',
      'maxlength': 'le nom de la boutique ne doit pas être plus que 150 caractères.'
    },
    'description': {
      'required': 'la description  est requise.',
      'minlength': 'la description être plus que 4 caractères.'
    }
  };


  constructor(
    private formBuilder: FormBuilder,
    private demandeOuvertureBoutiqueService: DemandeOuvertureBoutiqueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.demandeOuvertureBoutiqueForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      phone: '',
      email: '',
      pageFacebook: '',
      linkedin: '',
      adresse: ''
    });
    this.demandeOuvertureBoutiqueForm
      .valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.demandeOuvertureBoutiqueForm) { return; }
    const form = this.demandeOuvertureBoutiqueForm;
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
    this.demandeOuvertureBoutique = this.demandeOuvertureBoutiqueForm.value;

    this.demandeOuvertureBoutiqueService
        .createDemandeOuvertureBoutique(this.demandeOuvertureBoutique)
        .subscribe(
          demande => {},
          error => {},
          ()=>{
            this.router.navigateByUrl('/confirme-demande');
          }
        )
    this.demandeOuvertureBoutiqueFormDirective.resetForm();
  }
}
