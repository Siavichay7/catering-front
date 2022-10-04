import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Categoria } from '../interfaces/categoria.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  categorias: Categoria[] = [
    {
      nombre: "Menú Clásico",
      productos: [
        {
          nombre: "Adulto",
          precio: 8.00
        },
        {
          nombre: "Niño",
          precio: 4.00
        }
      ],
      checkbox: false
    },
    {
      nombre: "Menú del Chef",
      productos: [
        {
          nombre: "Adulto",
          precio: 12.00
        },
        {
          nombre: "Niño",
          precio: 6.00
        }
      ],
      checkbox: false
    }
  ]

  constructor(private modalCtrl: ModalController, private apiService: ApiService) {}

  ionViewWillEnter(){
    // this.cargarCategorias();
    // this.cargarServiciosAdicionales()
  }  

}
