import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-compte',
  templateUrl: './delete-compte.component.html',
  styleUrls: ['./delete-compte.component.css']
})
export class DeleteCompteComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.modalService.dismissAll()
  }

  supprimerMonCompte() {
    let user = this.authService.user;
    this.authService
        .deleteCompteById(user._id)
        .subscribe(
          user => {
            this.authService.logout();
            this.close();
            this.router.navigate(['sign-up'])
          }, 
          err => {},
          () => {}
        )
  }

}
