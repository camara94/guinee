import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css']
})
export class LoginSuccessComponent implements OnInit {

  @Input() fromParent;
  messageDeLogin: any = null;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.fromParent.error.message != null) {
      this.messageDeLogin = this.fromParent.error.message;
    }
    console.log(this.messageDeLogin )

    if(this.messageDeLogin == null){
      this.modalService.dismissAll();
    }
  }

  close() {
      this.router.navigate(['/'])
      setTimeout(() => {
        this.modalService.dismissAll()
        location.reload()
      }, 1000)
  }

  goToProfile() {
    this.router.navigate(['profil'])
    setTimeout(() => {
      this.modalService.dismissAll()
      location.reload()
    }, 1000)
  }

}
