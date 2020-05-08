import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';
import { Empleado } from '../../models/empleado';

declare var M: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [EmpleadoService]
})
export class EmpleadosComponent implements OnInit {

  constructor( private empleadoService : EmpleadoService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form?: NgForm) {
    console.log(form.value);
    if(form.value._id) {
      this.empleadoService.putEmpleado(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getEmployees();
          M.toast({html: 'Updated Successfully'});
        });
    } else {
      this.empleadoService.postEmpleado(form.value)
      .subscribe(res => {
        this.getEmployees();
        this.resetForm(form);
        M.toast({html: 'Save successfully'});
      });
    }
    
  }

  getEmployees() {
    this.empleadoService.getEmpleados()
      .subscribe(res => {
        this.empleadoService.empleados = res as Empleado[];
      });
  }

  editEmployee(employee: Empleado) {
    this.empleadoService.selectedEmpleado = employee;
  }

  deleteEmployee(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.empleadoService.deleteEmpleado(_id)
        .subscribe(res => {
          this.getEmployees();
          this.resetForm(form);
          M.toast({html: 'Deleted Succesfully'});
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.empleadoService.selectedEmpleado = new Empleado();
    }

  }

}
