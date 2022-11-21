import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto:string;
  cantidad:number;
  formularioIncorrecto:boolean;
  textIncorrecto:string;
  constructor(
    private _presupuestoService: PresupuestoService
  ) { 
    this.nombreGasto="";
    this.formularioIncorrecto=false;
    this.cantidad=0;
    this.textIncorrecto="";
  }

  ngOnInit(): void {
  }

  agregarGasto(){

    //comprobar que el gasto no sea mayor que el presupuesto
    if(this.cantidad > this._presupuestoService.presupuesto){
      this.formularioIncorrecto=true;
      this.textIncorrecto = "Cantidad ingresada es mayor al restante";
      return;
    }

    //comprobar que ninguno de los dos campos estan vacios
    if(this.nombreGasto === '' || this.cantidad <= 0){
      this.formularioIncorrecto = true;
      this.textIncorrecto="Nombre gasto o cantidad incorrecta";
    } else {

      //creamos el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }

      //enviamos el objeto a los suscriptores via subjet
      this._presupuestoService.agregarGasto(GASTO);

      //reseteamos formulario
      this.formularioIncorrecto = false;
      this.nombreGasto = "";
      this.cantidad=0;
    }
  }

}
