import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';


const listMascotas: Mascota[] = [
  {nombre: 'Ciro', edad: 3, raza: 'Golden', color:'Dorado', peso: 13},
  {nombre: 'Pelusa', edad: 1, raza: 'Maltipoo', color:'Apricot', peso: 3},
  {nombre: 'Enzo', edad: 2, raza: 'Labrador', color:'Negro', peso: 15},
  {nombre: 'Julieta', edad: 4, raza: 'Labrador', color:'Cafe', peso: 13}
];

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso','acciones'];
  dataSource = new MatTableDataSource<Mascota>(listMascotas);
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarMascota(){

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this._snackBar.open('La mascota ha sido eliminada', '',{
      duration:4000,
      horizontalPosition:'right'});
    }, 3000);

  }
}
