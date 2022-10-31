import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from 'src/app/interfaces/mascota';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {

  loading: boolean = false;
  formAgregar: FormGroup;


  constructor(private fb: FormBuilder) { 
    this.formAgregar = this.fb.group({
      nombre: ['', Validators.required, Validators.maxLength(30)],
      raza: ['', Validators.required, Validators.maxLength(30)],
      color: ['', Validators.required, Validators.maxLength(30)],
      edad: ['', Validators.required, Validators.maxLength(30)],
      peso: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  agregarMascota(){

    const mascota: Mascota = {
      nombre: this.formAgregar.value.nombre,
      raza: this.formAgregar.value.raza,
      color: this.formAgregar.value.color,
      edad: this.formAgregar.value.edad,
      peso: this.formAgregar.value.peso,

    }

    
  }

}
