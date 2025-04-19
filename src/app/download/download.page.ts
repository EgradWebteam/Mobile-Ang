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
