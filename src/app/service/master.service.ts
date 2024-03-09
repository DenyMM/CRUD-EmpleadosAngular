import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeModel } from '../../model/employe.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

constructor(private http:HttpClient){}
apiurl = 'api/employe'

GetAll(){
  return this.http.get<employeModel[]>(this.apiurl);
}

GetById(id:number){
  return this.http.get<employeModel>(`${this.apiurl}/${id}`);
}
CreateEmploye(employe:employeModel){
  return this.http.post(this.apiurl,employe);
}

UpdateEmploye(employe:employeModel){
  return this.http.put(`${this.apiurl}/${employe.id}`,employe);
}

DeleteEmploye(id:number){
  return this.http.delete(`${this.apiurl}/${id}`);
}

}
