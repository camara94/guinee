import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { baseURL } from './../../shared/baseurl';
import { User } from './../../shared/modeles/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteCompteComponent } from './../delete-compte/delete-compte.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  baseURL: string = baseURL;
  user: User;
  userErr: any;
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.authService
        .getCompteById(this.authService.user._id)
        .subscribe(
          user => this.user = user,
          err => this.userErr = err,
          () => {} 
        )
  }

  updateProfil() {
    this.router.navigate(['update-profil']);
  }
  resetPassword(id: string) {
    this.router.navigate(['reset-password/' + id]);
  }

  open() {
    const modalRef = this.modalService.open(
      DeleteCompteComponent, 
      { size: 'md', backdrop: 'static' }
    );
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

}
