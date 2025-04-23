import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BlobService } from '../services/blob.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  imports: [IonicModule,CommonModule],
  styleUrls: ['./download.page.scss'],

})
export class DownloadPage implements OnInit {

  constructor(private blobService: BlobService) { }
  // these are the variables
  jsonData: any;
  selectedSubjectIndex:number |null=null;
  ngOnInit() {
    const blobUrl =`https://mobstorageacct.blob.core.windows.net/mobile-container/samplejsonfordownlaod.json?sp=racwd&st=2025-04-22T11:54:41Z&se=2025-04-25T14:54:41Z&sv=2024-11-04&sr=b&sig=lXhYv2faQLI%2Fo3dVfTG0UShZpWlGKALjhaGYXGQWf%2BM%3D`;
    this.blobService.getJsonData(blobUrl).subscribe(
      (data) => {
        this.jsonData = data;
        console.log('fetched json :',this.jsonData);
      },
    )
  }
  toggleSections(index: number){
    this.selectedSubjectIndex=this.selectedSubjectIndex===index ?null :index;
  }

}
