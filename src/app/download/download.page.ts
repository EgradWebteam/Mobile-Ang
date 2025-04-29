import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import this
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-download',
  standalone: true, // ✅ Required for loadComponent usage
  imports: [IonicModule, CommonModule], // ✅ Add CommonModule here
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  examName: string = '';

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}
  examCards = [
    {
      name: 'IIT',
      key: 'iit',
      image: '../../assets/iit.png'
    },
    {
      name: 'NEET',
      key: 'neet',
      image: '../../assets/iit.png'
    },
    {
      name: 'BITSAT',
      key: 'bitsat',
      image: '../../assets/bitsat.png'
    },
    {
      name: 'VITEEE',
      key: 'vitee',
      image: '../../assets/vit.png'
    }
  ];
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.examName = params.get('exam') || '';
    });
  }

  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/download/${page}`);
  }

  navigateToMain() {
    this.navCtrl.navigateBack('/download');
  }
}
