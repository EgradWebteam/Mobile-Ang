import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BlobService } from '../services/blob.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-download',
  templateUrl: './downloadsectionspage.html',
  styleUrls: ['./downloadsections.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class DownloadSectionsPage implements OnInit {
  jsonData: any = [];
  selectedSubjectIndex: number | null = null;
  selectedSectionIndex: number | null = null;
  selectedSection: any = {}; // To store the selected section data and its questions

  constructor(private blobService: BlobService) {}

  ngOnInit() {
    const blobUrl = 'https://mobstorageacct.blob.core.windows.net/mobile-container/samplejsonfordownlaod.json?sp=racwd&st=2025-04-22T11:54:41Z&se=2025-04-25T14:54:41Z&sv=2024-11-04&sr=b&sig=lXhYv2faQLI%2Fo3dVfTG0UShZpWlGKALjhaGYXGQWf%2BM%3D';
    
    // Fetch data from the Blob service
    this.blobService.getJsonData(blobUrl).subscribe((data) => {
      this.jsonData = data;
      
      // Automatically display the first section of the first subject (if any)
      if (this.jsonData.length > 0) {
        this.selectedSubjectIndex = 0;
        this.selectedSectionIndex = 0;
        this.selectedSection = this.jsonData[this.selectedSubjectIndex].sections[this.selectedSectionIndex];
      }
    });
  }

  selectSubject(index: number) {
    this.selectedSubjectIndex = index;
    this.selectedSectionIndex = null; // Reset section selection
    this.selectedSection = {}; // Reset selected section data
  }
  handleAnswer(questionId: number, selectedOption: string, event?: any) {
    if (!this.selectedSection?.questions) return;
  
    const question = this.selectedSection.questions.find(
      (q: any) => q.question_id === questionId
    );
  
    if (!question) return;
  
    if (question.qtype === 'MCQ') {
      question.userAnswer = selectedOption;
    } else if (question.qtype === 'MSQ') {
      if (!question.userAnswer) question.userAnswer = [];
  
      const isChecked = event?.detail?.checked;
  
      // Limit selection to number of correct answers
      const maxSelections = question.answer?.length || 0;
  
      if (isChecked) {
        if (question.userAnswer.length < maxSelections) {
          question.userAnswer.push(selectedOption);
        }
      } else {
        question.userAnswer = question.userAnswer.filter((opt: string) => opt !== selectedOption);
      }
  
   
    }
  }
  
  canShowSolution(question: any): boolean {
    if (question.qtype === 'MCQ') {
      return !!question.userAnswer;
    }
    if (question.qtype === 'MSQ') {
      return question.userAnswer?.length === question.answer?.length;
    }
    return false;
  }
  
  
  checkSolution(question: any): void {
    if (question.qtype === 'MCQ') {
      question.isCorrect = question.userAnswer === question.answer;
    } else if (question.qtype === 'MSQ') {
      const selected = question.userAnswer || [];
      const correct = question.answer || [];
      const solution = question.solution || [];
      question.isCorrect =
        selected.length === correct.length &&
        selected.every((ans: string) => correct.includes(ans));
    }
    question.showResult = true;
  }
  
  
  selectSection(index: number) {
    if (this.selectedSubjectIndex !== null && index !== null) {
      this.selectedSectionIndex = index;
      this.selectedSection = this.jsonData[this.selectedSubjectIndex].sections[this.selectedSectionIndex];
    }
  }

  getAlphabet(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
