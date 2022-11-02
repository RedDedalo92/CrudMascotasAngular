import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit {
  id: number;
  mascota!: Mascota;
  loading: boolean = false;

  mascota$!: Observable<Mascota>

  constructor(private _mascotaService: MascotaService, private aRoute: ActivatedRoute) {
    // Una opcion para obtener id por ruta
     this.id = Number(this.aRoute.snapshot.paramMap.get('id'))!;
   }

  ngOnInit(): void {
     this.mascota$ = this._mascotaService.getMascota(this.id);
     //this.obtenerMascota();
    // this.aRoute.params.subscribe(data =>{
    //   this.id = data['id'];
    //   this.obtenerMascota();
    // })
    //this.obtenerMascota();
  }

  // obtenerMascota(){
  //   this._mascotaService.getMascota(this.id).subscribe(data => { console.log(data)
  //     this.mascota = data;
  //   })
  // }

  //   obtenerMascota(){
  //   this._mascotaService.getMascota(this.id).subscribe(data => { 
  //     this.mascota = data;
  //   });
  // }
}
