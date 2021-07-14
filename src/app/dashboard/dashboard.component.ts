import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../common.service';
import { Employee } from '../Employee';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 

    emp: Employee = new Employee();
    employees: Employee[]=[];
    isEdit:boolean = false;
  
  constructor(private commonservice: CommonService) { }

  ngOnInit(): void {
    this.getAll();
  }

  addUser(form: NgForm){
    console.log(form.value.id);
    
    if(form.value.fullname != "" && form.value.email){
    this.commonservice.createUser(form.value).subscribe((res) => (this.employees.push(res)));
    form.resetForm();
    }
    else{
      alert('Fill The Form');
    }
  }
  getAll():void{
    this.commonservice.getAllUsers().subscribe((employees) => (this.employees = employees));
  }

  editEmployee(user: Employee): void{
    this.isEdit = true;
    this.commonservice.getOneUser(user).subscribe(res=>{
      this.emp = res;
    })
    
  }
  deleteEmployee(user: Employee):void{
    const comfirm = window.confirm("Do you want to delete ?");
    if(comfirm)
    {
      this.commonservice.deleteUser(user)
     .subscribe(()=> (this.employees = this.employees.filter(t => t.id!= user.id)));
     this.emp = new Employee();
     this.isEdit = false;
    }
    
  }

  updateEmployee(form: NgForm){
    this.isEdit = !this.isEdit;
    this.commonservice.updateUser(form.value).subscribe((res)=>{
      form.resetForm();     
      this.getAll();
    })
  }

}
