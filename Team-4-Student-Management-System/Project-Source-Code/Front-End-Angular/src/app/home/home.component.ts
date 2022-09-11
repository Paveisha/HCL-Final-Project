import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent   {
//student array to save the student list retrieved from database
  studentsArray = null;
//to check wether to show student details table or not
  arrayLength: number = 0;
//to save the id that has to be deleted
  deleteRollNum!:number;

//to temporarily save the student detail before updating
  studentUpdate ={
    rollNumber: 0,
    name: "",
    address: "",
    marks: ""
  };
//to show the student table if the array is not null
  public studentTable: boolean = false;

  constructor(private studentService: StudentService) {
    this.getStudentsDetails();
  }

  ngOnInit(): void {
    this.getStudentsDetails();
  }

  //to validate inputs
  registerFormValidation = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]+$')]),
    address: new FormControl('',Validators.required),
    marks: new FormControl('',Validators.compose([Validators.required,Validators.max(100),Validators.min(0)]))

  })

  //to show error messages
  get studentName(){
    return this.registerFormValidation.get('name')
  }
  get studentAddress(){
    return this.registerFormValidation.get('address')
  }
  get studentMarks(){
    return this.registerFormValidation.get('marks')
  }



  
  //to add student
  register(){

        this.studentService.registerStudent(this.registerFormValidation.value).subscribe(
          (response: any) => {
            console.log(response);
            this.getStudentsDetails();
            this.studentTable = true;
            alert("Student "+this.registerFormValidation.value.name+" added successfully");
            this.registerFormValidation.reset();
            
          },
          (error: any) => {
            console.log(error);
          }
        );   
  }

  
//to get the student list
  getStudentsDetails(){
    this.studentService.getStudents().subscribe(
      (response: any) => {
        console.log(response);
        this.studentsArray = response;
        this.arrayLength = response.length;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


//to delete the student
  delete(student: { rollNumber: number; name: string; address: string; marks: string; }){
    this.deleteRollNum = student.rollNumber;
  }

  deleteStudent(){
    this.studentService.deleteStudent(this.deleteRollNum).subscribe(
      (response: any) => {
        console.log(response);
        this.getStudentsDetails();
        alert("Roll Number: "+this.deleteRollNum+" deleted successfully");
        console.log("Array length"+this.arrayLength);
        if(this.arrayLength == 1){
          this.studentTable = false;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
//to update the student
  update(student: { rollNumber: number; name: string; address: string; marks: string; }){
    this.studentUpdate = student;
  }

  updateStudent(){
    this.studentService.updateStudent(this.studentUpdate).subscribe(
      (response: any) => {
        console.log(response);
        this.getStudentsDetails();
        alert("Student "+ this.studentUpdate.name+" updated successfully");
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
