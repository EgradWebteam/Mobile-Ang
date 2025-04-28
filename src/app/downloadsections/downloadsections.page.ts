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
    const blobUrl = 'https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D';
    
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

  // Handle subject selection
  selectSubject(index: number) {
    this.selectedSubjectIndex = index;
    this.selectedSectionIndex = null; // Reset section selection
    this.selectedSection = {}; // Reset selected section data
  }

  // Handle answer selection for MCQ and MSQ
  handleAnswer(questionId: number, selectedOption: string, event?: any) {
    if (!this.selectedSection?.questions) return;
  
    const question = this.selectedSection.questions.find(
      (q: any) => q.question_id === questionId
    );
  
    if (!question) return;
  
    if (question.qtype === 'MCQ') {
      question.userAnswer = selectedOption;
      question.showResult = true;
      question.isCorrect = question.userAnswer === question.answer;
      question.answer = question.answer || ''; // Ensure answer is defined
    } else if (question.qtype === 'MSQ') {
      if (!question.userAnswer) question.userAnswer = [];
  
      const isChecked = event?.detail?.checked;
  
      // Limit selection to the number of correct answers
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

  handleMSQAnswer(questionId: number, optionIndex: string, event?: any) {
    if (!this.selectedSection?.questions) return;
  
    console.log(optionIndex);
  
    const question = this.selectedSection.questions.find(
      (q: any) => q.question_id === questionId
    );
  
    if (!question) return;
  
    console.log('userAnswer before:', question.userAnswer);
  
    // Ensure userAnswer is always initialized
    if (!question.userAnswer) {
      question.userAnswer = [];
    }
  
    const selectedOptions: string[] = question.userAnswer || [];
    const isOptionSelected = selectedOptions.includes(optionIndex);
  
    // Toggle the selected option on click
    if (isOptionSelected) {
      // If the option is already selected, remove it
      question.userAnswer = selectedOptions.filter((opt) => opt !== optionIndex);
    } else {
      // If the option is not selected, add it
      question.userAnswer = [...selectedOptions, optionIndex];
    }
  
    // Update selected options in the question data
    question.selectedOptions = [...question.userAnswer];
  
    // Determine correctness and solution visibility
    const correctAnswers: string[] = question.answer?.split(",") || [];
    const allCorrectSelected = correctAnswers.every((answer: string) =>
      selectedOptions.includes(answer)
    );
    const hasWrongAnswer = selectedOptions.some(
      (opt) => !correctAnswers.includes(opt)
    );
  
    question.isCorrect = allCorrectSelected;
    question.showResult = true;
  
    if (hasWrongAnswer) {
      question.isCorrect = false;
      question.showSolution = true;
    } else {
      question.showSolution = false;
    }
  
    console.log('userAnswer after:', question.userAnswer);
    console.log('Selected Options:', selectedOptions);
  }
  
  isOptionDisabled(question: any, option: any): boolean {
    if (!question || !question.answer || !question.userAnswer) return false;
  
    const correctAnswers: string[] = question.answer?.split(",") || [];
    const selectedOptions: string[] = question.userAnswer || [];
  
    const hasWrongAnswer = selectedOptions.some(
      (opt) => !correctAnswers.includes(opt)
    );
    const allCorrectSelected = correctAnswers.every((answer) =>
      selectedOptions.includes(answer)
    );
  
    return hasWrongAnswer || allCorrectSelected;
  }
  
  
  
canShowSolution(question: any): boolean {
  if (question.qtype === 'MCQ') {
    return !!question.userAnswer;
  }
  if (question.qtype === 'MSQ') {
    return this.isOptionDisabled(question, question.answer);
  }

  return false;
}


  
  // Check the solution for correctness
  checkSolution(question: any): void {
    if (question.qtype === 'MCQ') {
      question.isCorrect = question.userAnswer === question.answer;
    } else if (question.qtype === 'MSQ') {
      const selected = question.userAnswer || [];
      const correct = question.answer || [];
      question.isCorrect =
        selected.length === correct.length &&
        selected.every((ans: string) => correct.includes(ans));
    }
  
    // Always check the solution when this function is called
    question.showResult = true;
    question.showSolution = true; // Show solution after checking
  }
  
  // Toggle the solution visibility
  toggleSolution(question: any): void {
    if (!question.showSolution) {
      this.checkSolution(question); // Check and show solution if it's hidden
    } else {
      question.showSolution = false; // Hide the solution
    }
  }

  // Handle section selection
  selectSection(index: number) {
    if (this.selectedSubjectIndex !== null && index !== null) {
      this.selectedSectionIndex = index;
      this.selectedSection = this.jsonData[this.selectedSubjectIndex].sections[this.selectedSectionIndex];
    }
  }

  
  // Helper function to get alphabetic label
  getAlphabet(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
