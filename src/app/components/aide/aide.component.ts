import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Aide } from './../../shared/modeles/aide';
import { AideService } from './../../services/aide.service';
import { baseURL } from './../../shared/baseurl';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.css']
})
export class AideComponent implements OnInit {

  baseURL: string = baseURL;
  url =""
  aides: Aide[];
  constructor(
    private modalService: NgbModal,
    private aideService: AideService,
    private domSanitizer: DomSanitizer
    ) {
      
     }


  ngOnInit(): void {
    this.aideService
        .getAllAides()
        .subscribe(
          aides => { 
            this.aides = aides;
            aides.forEach((aide,i)=>{}
            );
          }
        )
        
  }

  /**
    * Open modal for show the video
    * @param content content of modal
    */
  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'lg', centered: true });
  }

  getURL(url) {
    return this.domSanitizer.bypassSecurityTrustUrl(url)
  }
}