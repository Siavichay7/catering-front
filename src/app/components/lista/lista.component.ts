import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { ServicioAdicional } from 'src/app/interfaces/servicio-adicional.interface';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  @Input() categorias: Categoria[] = []
  idCategoria: number

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }  

  async openModal(event: Categoria) {
    this.router.navigate(['detalle', event])
  }
}
