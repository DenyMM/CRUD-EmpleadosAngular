import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }
   createDb():{} | Observable<{}> | Promise<{}> {
      return{
        
          employe: [
              {
                  id: 1,
                  nombre: "Maria Mendoza Lopez",
                  fechaNacimiento: 1653026400000,
                  edad: 32,
                  estatus: true,
                  idCargo: 1
              },
              {
                id: 2,
                nombre: "Sebastian Salazar Ruiz",
                fechaNacimiento: 1683076400000,
                edad: 23,
                estatus: false,
                idCargo: 2
            }
          ],
         
      };
  }
}
