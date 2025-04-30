import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BlobService } from '../services/blob.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
import { ExamDataService } from '../services/examdata.service'; 
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
dropdownOpen: boolean = false; // To control the dropdown state
  
  examDataSelected: any = null; 
  // examData: any = [
  //   {
  //   id: 1,
  //   data_heading: "JEE ADVANCE ",
  //   dataExamName: "JEE ADVANCE",
  //   dataExamImg: "/JEE-Advanced-2025-Logo.webp",
  //   "2025": [
  //     {
  //       year: 2025,
  //       months: [
  //         {
  //           month: "JANUARY",
  //           data: [
  //             {
  //               id: 501,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 502,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         },{
  //           month: "FEBRUARY",
  //           data: [
  //             {
  //               id: 501,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 502,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ],
  //   "2024": [
  //     {
  //       year: 2024,
  //       months: [
  //         {
  //           month: "JANUARY",
  //           data: [
  //             {
  //               id: 701,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 702,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },{
  //   id: 2,
  //   data_heading: "NEET",
  //   dataExamName: "NEET",
  //   dataExamImg: "/NEET",
  //   "2025": [
  //     {
  //       year: 2025,
  //       months: [
  //         {
  //           month: "JANUARY",
  //           data: [
  //             {
  //               id: 501,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 502,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         },{
  //           month: "FEBRUARY",
  //           data: [
  //             {
  //               id: 501,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 502,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ],
  //   "2024": [
  //     {
  //       year: 2024,
  //       months: [
  //         {
  //           month: "JANUARY",
  //           data: [
  //             {
  //               id: 701,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 702,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },{
  //   id: 3,
  //   data_heading: "BITSAT",
  //   dataExamName: "BITSAT",
  //   dataExamImg: "/NEET",
  //   "2025": [
  //     {
  //       year: 2025,
  //       months: [
  //         {
  //           month: "JANUARY",
  //           data: [
  //             {
  //               id: 501,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 502,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         },{
  //           month: "FEBRUARY",
  //           data: [
  //             {
  //               id: 501,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 502,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ],
  //   "2024": [
  //     {
  //       year: 2024,
  //       months: [
  //         {
  //           month: "JANUARY",
  //           data: [
  //             {
  //               id: 701,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 702,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },{
  //   id: 4,
  //   data_heading: "VITEE",
  //   dataExamName: "VITEE",
  //   dataExamImg: "/NEET",
  //   "2025": [
  //     {
  //       year: 2025,
  //       months: [
  //         {
  //           month: "JANUARY",
  //           data: [
  //             {
  //               id: 501,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 502,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         },{
  //           month: "FEBRUARY",
  //           data: [
  //             {
  //               id: 501,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 502,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ],
  //   "2024": [
  //     {
  //       year: 2024,
  //       months: [
  //         {
  //           month: "JANUARY",
  //           data: [
  //             {
  //               id: 701,
  //               shift: "10th Jan - Shift-1",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             },
  //             {
  //               id: 702,
  //               shift: "10th Jan - Shift-2",
  //               shiftDataUrl: "https://mobstorageacct.blob.core.windows.net/mobile-container/msqs.json?sp=racwd&st=2025-04-28T09:20:25Z&se=2025-05-28T17:20:25Z&sv=2024-11-04&sr=b&sig=leGCLvLRyD37n3up4Sj67AV4UBdbTbHWwQLTAhDG0xo%3D"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }];
  examData: any = []; // Initialize as an empty array
  selectedYear: any = null;
  selectedMonth: any = null;
  selectedShift: any = null;
  selectedDocUrl: string = '';
  
  constructor(private blobService: BlobService, private route: ActivatedRoute,  private examDataService: ExamDataService ) {} // ✅ Inject route
  ngOnInit() {
    this.examDataService.examData$.subscribe((data) => {
      if (data.length === 0) {
        this.examDataService.fetchExamData();
      }

      this.examData = data;

      if (this.examData.length > 0) {
        const examIdMap: { [key: string]: number } = {
          IIT: 1,
          NEET: 2,
          BITSAT: 3,
          VITEE: 4
        };

        this.route.paramMap.subscribe((params) => {
          const examKey = params.get('exam'); 
          const examId = examIdMap[examKey!];

          if (examId !== undefined) {
            console.log(this.examData);
            const foundExam = this.examData.find((e: any) => e.id === examId);
            
            if (foundExam) {
              this.examDataSelected = foundExam;
            } else {
              console.warn(`No exam found with ID ${examId}`);
            }
          } else {
            console.warn(`Invalid exam type in route: ${examKey}`);
          }
        });
      }
    });
  }


  // ✅ Reusable method to fetch data
  loadBlobData(url: string) {
    this.blobService.getJsonData(url).subscribe((data) => {
      this.jsonData = data;
      this.selectedSubjectIndex = 0;
      this.selectedSectionIndex = 0;
      this.selectedSection =this.jsonData[0].sections[0];
      this.dropdownOpen = false;
    });
  }

  getYears(): string[] {
    return Object.keys(this.examDataSelected).filter(k => !isNaN(Number(k)));
  }

  // ✅ Get months for selected year
  getMonths(year: string): any[] {
    return this.examDataSelected[year]?.[0]?.months || [];
  }

  toggleYear(year: string) {
    // Toggle the year selection
    this.selectedYear = this.selectedYear === year ? null : year;
    this.selectedMonth = null; // Reset month when year changes
    this.selectedShift = null; // Reset shift when year changes
  }

  toggleMonth(month: any) {
    // Toggle the month selection
    this.selectedMonth = this.selectedMonth === month ? null : month;
    this.selectedShift = null; // Reset shift when month changes
  }

  selectShift(shift: any) {
    // Set the selected shift
    this.selectedShift = shift;
    this.onShiftSelect(); // Trigger shift selection handler
  }

  // ✅ Called when a shift is selected
  onShiftSelect() {
    if (this.selectedShift?.shiftDataUrl) {
      const url = this.selectedShift.shiftDataUrl;
      this.selectedDocUrl = url;
      this.loadBlobData(url);  // 🔁 Load new blob data
    }
  }

  // (optional) in case you want to use the full URL elsewhere
  getFullDocUrl(): string {
    return this.selectedDocUrl;
  }

  
  selectSubject(index: number) {
    if (this.selectedSubjectIndex !== index) {
      this.selectedSubjectIndex = index;
      this.dropdownOpen = true;
      // Do NOT reset section or change selectedSection content
    } else {
      this.dropdownOpen = !this.dropdownOpen;
    }
  }
  
  // selectSubject(index: number) {
  //   console.log("selectedSubjectIndex", this.selectedSubjectIndex)
  //   if (this.selectedSubjectIndex === index) {
  //     this.selectedSubjectIndex = index;
   
  //     // If the same subject is clicked, toggle the dropdown
  //     this.dropdownOpen = !this.dropdownOpen;
  //   } else {
  //     // If a different subject is clicked, close the current dropdown and open the new one
  //     this.selectedSubjectIndex = index;
  //     this.dropdownOpen = true;  // Open the dropdown for the selected subject
  //   }
  // }
  
  
  selectSection(subjectIndex: number, sectionIndex: number) {
    console.log("selectedSubjectIndex", this.selectedSubjectIndex,subjectIndex)
    this.dropdownOpen = !this.dropdownOpen;

      // Otherwise, set the new section
      this.selectedSectionIndex = sectionIndex;
      this.selectedSection = this.jsonData[subjectIndex].sections[sectionIndex];
    
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
  // selectSection(index: number) {
  //   if (this.selectedSubjectIndex !== null && index !== null) {
  //     this.selectedSectionIndex = index;
  //     this.selectedSection = this.jsonData[this.selectedSubjectIndex].sections[this.selectedSectionIndex];
  //   }
  // }

  
  // Helper function to get alphabetic label
  getAlphabet(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
