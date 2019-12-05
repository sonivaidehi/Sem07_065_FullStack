import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Employee } from "./employee.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise' 



@Injectable()
export class EmployeeService {
  selectedEmployee: Employee;
  public employees:  Employee[];
  
  readonly baseUrl = "http://localhost:3000/employee";
  constructor(private http : HttpClient) { }

  postEmployee(emp: Employee){
    return this.http.post(this.baseUrl + "/insertEmployee",emp);
  }

  getEmployeeList(){
    return this.http.get(this.baseUrl + "/getAllEmployees");
  }
}
