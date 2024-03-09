
import { Component } from '@angular/core';
import { MasterService } from './service/master.service';
import { employeModel } from '../model/employe.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  employelist!:employeModel[];
  datasource:any;
  editdata! : employeModel;
  displayedColumns: string[] = ['id', 'nombre', 'fechaNacimiento', 'edad', 'estatus', 'idCargo', 'action'];
  isadd=false;
  isedit = false;

  constructor(private service:MasterService, private builder:FormBuilder) {
    this.LoadEmployelist();
  }

  employeform = this.builder.group({
    id:this.builder.control({value:0,disabled:true}),
    nombre:this.builder.control('', Validators.required),
fechaNacimiento:this.builder.control({value:0,disabled:false}),
    edad:this.builder.control({value:0,disabled:false}),
estatus:this.builder.control( {  }),
    idCargo:this.builder.control({value:0,disabled:false}),
  })


  LoadEmployelist(){
    this.service.GetAll().subscribe(item=>{
      this.employelist=item;
      this.datasource=new MatTableDataSource(this.employelist);
    })
  }


  saveEmploye(){
    if(this.employeform.valid){
      let _obj:employeModel = {
        id:this.employeform.value.id as number,
        nombre:this.employeform.value.nombre as string,
fechaNacimiento: this.employeform.value.fechaNacimiento as number,
        edad:this.employeform.value.edad as number,
estatus: (this.employeform.value.estatus as unknown) as boolean,
        idCargo:this.employeform.value.idCargo as number
      }
      if(this.isadd){
        this.service.CreateEmploye(_obj).subscribe(item=>{
          this.LoadEmployelist();
          alert('El empleado se agrego correctamente');
        })
      }else{
        _obj.id = this.employeform.getRawValue().id as number;
        this.service.UpdateEmploye(_obj).subscribe(item=>{
          this.LoadEmployelist();
          alert('El empleado se modifico correctamente');
        })
      }
      this.regresar();
    }
  }

  editEmploye(id:number){
    this.service.GetById(id).subscribe(item =>{
      this.editdata = item;
      this.employeform.setValue({id:this.editdata.id,nombre:this.editdata.nombre,
      fechaNacimiento:this.editdata.fechaNacimiento,edad:this.editdata.edad,
      estatus:this.editdata.estatus,idCargo:this.editdata.idCargo,
    });
    this.isedit = true;
    })
  }

  deleteEmploye(id:number){
    if(confirm('¿Desea eliminar el empleado?')){
      this.service.DeleteEmploye(id).subscribe(item =>{
        this.LoadEmployelist();
        alert('Empleado eliminado');
      })
    }
  }

  insertEmploye(){
    this,this.employeform.reset();
    this.isadd=true;
    this.isedit = false;
  }

  regresar(){
    this.isadd=false;
    this.isedit=false;
  }
  
}
