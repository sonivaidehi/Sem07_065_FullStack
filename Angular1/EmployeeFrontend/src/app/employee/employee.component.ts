import { Component, OnInit } from '@angular/core';

import { EmployeeService } from "../shared/employee.service";

import { NgForm } from "@angular/forms";
import { Employee } from '../shared/employee.model';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  emps : Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm()
    this.refreshEmployeeList()
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = {
        _id : "",
        EmployeeName: "",
        EmployeeSalary: null,
        EmployeeAge: null
      }
    }
  }

  onSubmit(form : NgForm){
    this.employeeService.postEmployee(form.value).subscribe((res)=>{
      this.resetForm(form);
    });
  }

  refreshEmployeeList(){
    
    this.employeeService.getEmployeeList().subscribe((res: Employee[])=>{
      //  this.employeeService.employees = res as Employee[]
      // //this.employeeService.employees.push(res as Employee[]);
      // console.log(res);
      this.emps = res['msg'];
      console.log(res['msg']);
    });
  }
}
