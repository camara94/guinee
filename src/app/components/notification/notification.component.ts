import { Component, Inject, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from './../../shared/modeles/notification';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notification: Notification;
  erreur: any;
  constructor(
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NotificationComponent>
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(this.data)
    this.notification = this.data.notification;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
