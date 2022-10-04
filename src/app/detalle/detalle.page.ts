import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Categoria } from '../interfaces/categoria.interface';
import { ServicioAdicional } from '../interfaces/servicio-adicional.interface';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})

export class DetallePage implements OnInit {

  descuento: number = 0;
  total: number = 0  
  serviciosAdicionales: ServicioAdicional[] = 
  [
    {
      descripcion: "Costo por entrega a domicilio",
      precio: 5.00
    },
    {
      descripcion: "Costo por entrega a domicilio",
      precio: 50
    }
  ]
  // Create the form
  form: FormGroup = this.fb.group({
    nombre: new FormControl('',
      [
        Validators.required,
      ]),
    correo: new FormControl('',
      [
        Validators.required,
      ]),
      telefono: new FormControl('',
      ),
    cantidadAdulto: new FormControl(0,
      [
        Validators.required,

      ]),
    cantidadNino: new FormControl(0,
      [
        Validators.required,

      ]),
      cantidadTotal: new FormControl(0,
        [
          Validators.required,
  
        ]),
        total: new FormControl(0,
          [
            Validators.required,
    
          ]),
      adicional: new FormControl(0,
        [
        ]),
        descuento: new FormControl(0,
          [
          ]),
     
  });
  categoria: Categoria
  precioAdulto: number = 0
  precioNino: number = 0
  constructor(private modalCtrl: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder, private alertController: AlertController
    ) {
    
     }

  ngOnInit() {
    this.route.params.subscribe((params: Categoria) => {
      this.categoria = params
      this.precioAdulto = this.categoria.id == 1 ? 8 : 12
      this.precioNino = this.categoria.id == 1 ? 4 : 6
    });
  }

  cantidadAdultos(event: any){
    this.form.patchValue({
      cantidadTotal: 0
    });
    this.form.patchValue({
      cantidadAdulto: event.detail.value
    });
    this.form.patchValue({
      cantidadTotal: parseInt(this.form.value.cantidadAdulto) + parseInt(this.form.value.cantidadNino)
    });
    this.form.value.cantidadTotal > 50 ?  this.form.patchValue({
      descuento: 4  
    }) : this.form.patchValue({
      descuento: 0
    })
    this.descuento = this.form.value.descuento
    const total = ((this.form.value.cantidadAdulto) * this.precioAdulto) + ((this.form.value.cantidadNino) * this.precioNino)
    this.form.patchValue({
      total: 
      this.form.value.descuento  == 4 ?
      total - (total  * 4 / 100) 
      :
      total
    });
  }

  cantidadNino(event: any){
    this.form.patchValue({
      cantidadTotal: 0
    });
    this.form.patchValue({
      cantidadNino: event.detail.value,
    });
    this.form.patchValue({
      cantidadTotal: parseInt(this.form.value.cantidadAdulto) + parseInt(this.form.value.cantidadNino)
    });
    
    this.form.value.cantidadTotal > 50 ?  this.form.patchValue({
      descuento: 4  
    }) : this.form.patchValue({
      descuento: 0
    })
    this.descuento = this.form.value.descuento
    const total = ((this.form.value.cantidadAdulto) * this.precioAdulto) + ((this.form.value.cantidadNino) * this.precioNino)
    this.form.patchValue({
      total: 
      this.form.value.descuento  == 4 ?
      total - (total  * 4 / 100) 
      :
      total
    });
  }

  cancel() {
    this.router.navigateByUrl('home')
  }

  async confirm() {
    if (this.form.valid) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        mode: 'ios',
        subHeader: 'Pedido exitoso',
        message: 'Se ha realizado exitosamente el pedido',
        buttons: [{
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.modalCtrl.dismiss(null, 'confirm');
          },
        },],
      });
      
      await alert.present();
      
    } else {
      const alert = await this.alertController.create({
        header: 'Alerta',
        mode: 'ios',
        subHeader: 'Pedido erróneo',
        message: 'Debes ingresar los datos solicitados',
        buttons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
          },
        },],
      });
      
      await alert.present();
    }
  }

  seleccionado(ev:any){
    if (ev.detail.value.length == 2) {
      this.form.patchValue({
        total: this.form.value.total + 55
      });
    } else {
      ev.detail.value.forEach(element => {
        if (element == "1") {
          this.form.patchValue({
            total: this.form.value.total + 5
          });
        } else {
          this.form.patchValue({
            total: this.form.value.total + 50
          });
        }
      });
    }
    
    
  }

}
