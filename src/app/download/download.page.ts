import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import this
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { ExamDataService } from '../services/examdata.service'; 
@Component({
  selector: 'app-download',
  standalone: true, // ✅ Required for loadComponent usage
  imports: [IonicModule, CommonModule], // ✅ Add CommonModule here
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  examName: string = '';
  examCards: any[] = [];  // Properly declare as an array of any type

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private examDataService: ExamDataService
  ) {}

  ngOnInit() {
    this.examDataService.examData$.subscribe((data) => {
      if (data.length === 0) {
        this.examDataService.fetchExamData();
      }

      this. examCards= data;
    });

    // Fetch exam name from URL params
    this.route.paramMap.subscribe(params => {
      this.examName = params.get('exam') || '';
    });
  }

  // Navigate to the respective page dynamically
  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/download/${page}`);
  }

  // Navigate back to the main page
  navigateToMain() {
    this.navCtrl.navigateBack('/download');
  }
}
