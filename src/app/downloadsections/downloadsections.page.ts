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
      console.log("question.isCorrect", question.isCorrect);
      question.answer = question.answer || ''; // Ensure answer is defined
      question.canShowSolution = true;
        }
  }
  handleNATAnswer(questionId: number, answer: string, event?: any) {
    if (!this.selectedSection?.questions) return;
  console.log("fgfg")
    const question = this.selectedSection.questions.find(
      (q: any) => q.question_id === questionId
    );
  
    if (!question) return;
  
    question.userAnswer = answer;
    question.showResult = true;
    question.isCorrect = question.userAnswer === question.answer;
    console.log("question.answer",question.isCorrect)
    question.answer = question.answer || ''; 
    question.canShowSolution = true;// Ensure answer is defined
  }
  handleMSQAnswer(questionId: number, optionIndex: string, event?: any) {
    if (!this.selectedSection?.questions) return;
  
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
  
    // Create a new array to store user answers + correct answers if any wrong option is selected
    const correctAnswers: string[] = question.answer?.split(",") || [];
    let userAnswerWithCorrect = [...question.userAnswer]; // Start with user's selected options
  
    // Check if any wrong answer has been selected

    // Debugging line to check if we are correctly identifying wrong answers
 
    console.log("selectedOptions",  question.userAnswer);
    
    console.log("selectedOptions", question.userAnswer);
    console.log("correctAnswers", correctAnswers);
  
    const hasWrongAnswer = question.userAnswer.some(
      (opt: string) => !correctAnswers.includes(opt)
    );
    question.isCorrect = hasWrongAnswer ? false : question.userAnswer.length === correctAnswers.length && question.userAnswer.every((ans: string) => correctAnswers.includes(ans));
    console.log("question.isCorrect", question.isCorrect);
    console.log("hasWrongAnswer", hasWrongAnswer);
    if (hasWrongAnswer) {
      console.log("fff")
      // If any wrong option is selected, add the missing correct answers
      correctAnswers.forEach((correctAnswer: string) => {
        if (!selectedOptions.includes(correctAnswer) && !userAnswerWithCorrect.includes(correctAnswer)) {
          userAnswerWithCorrect.push(correctAnswer); // Add missing correct answers
        }
      });
      // Remove duplicates by using Set (union of selectedOptions and correct answers)
      const uniqueAnswers = new Set([...userAnswerWithCorrect, ...selectedOptions, ...correctAnswers]);
  
      // Store the unique answers in question.userAnswerWithCorrect
      question.userAnswerWithCorrect = Array.from(uniqueAnswers);
    } else {
      // If no wrong answer, just send the selected user answers
      question.userAnswerWithCorrect = [...question.userAnswer]; // No missing correct answers
    }
  
   
  
    // Log for debugging
    console.log('userAnswer after:', question.userAnswer);
    console.log('userAnswerWithCorrect:', question.userAnswerWithCorrect);
  
    // Show result immediately after selecting an option
    question.showResult = true;
    question.canShowSolution = this.isOptionDisabled(question, question.answer);
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
  
  
  
// canShowSolution(question: any): boolean {
 
//   if (question.qtype === 'MCQ') {
//     return !!question.userAnswer;
//   }
//   if (question.qtype === 'MSQ') {
//     return this.isOptionDisabled(question, question.answer);
//   }
//   if (question.qtype === 'NATI') {
//     return !!question.showResult ;
//   }

//   return false;
// }


  
  // Check the solution for correctness
  checkSolution(question: any): void {
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
