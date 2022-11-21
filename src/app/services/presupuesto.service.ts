import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  private gastos$ = new Subject<any>();
  //almacenavos el valor del presupuesto añadido
  presupuesto:number;
  //almacenavos el valor del restante del presupuesto
  restante:number;
  constructor() { 
    this.presupuesto=0;
    this.restante=0;
  }

  agregarGasto(gasto:any){
    this.restante = this.restante - gasto.cantidad;
    this.gastos$.next(gasto);
  }

  getGastos(): Observable<any>{
    return this.gastos$.asObservable();
  }
}
