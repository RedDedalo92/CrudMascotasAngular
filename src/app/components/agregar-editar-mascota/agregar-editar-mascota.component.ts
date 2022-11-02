import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {

  loading: boolean = false;
  formAgregar: FormGroup;
  id: number;
  operacion: string = 'Agregar';


  constructor(private _snackBar: MatSnackBar, 
    private fb: FormBuilder, 
    private _mascotaService: MascotaService,
    private router:Router,
    private aRoute: ActivatedRoute) { 
    this.formAgregar = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required]
    });

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = 'Editar'
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id: number){
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe(data => {
      this.formAgregar.patchValue({
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso
      })
      this.loading= false;
    })
  }

  agregarEditarMascota(){

    const mascota: Mascota = {
      nombre: this.formAgregar.value.nombre,
      raza: this.formAgregar.value.raza,
      color: this.formAgregar.value.color,
      edad: this.formAgregar.value.edad,
      peso: this.formAgregar.value.peso,
    }

    if(this.id != 0){
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
    }
    else{
      this.agregarMascota(mascota);
    }
  }

  editarMascota(id:number, mascota: Mascota){
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe(() =>{
      this.loading = false;
      this.mensajeExito('actualizada');
      this.router.navigate(['/listarMascota'])
    })
  }

  agregarMascota(mascota: Mascota){
        //Enviamos objeto al backend
        this._mascotaService.addMascota(mascota).subscribe(data=>{
          this.mensajeExito('registrada');
          this.router.navigate(['/listarMascota']);
        })
  }

  mensajeExito( texto: string){
    this._snackBar.open(`La mascota fue ${texto} con exito`, '',{
    duration:4000,
    horizontalPosition:'right'});
}

}
