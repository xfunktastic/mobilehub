import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    // Realiza inicializaciones o configuraciones iniciales
  }

  /**
   * Abre el menú principal
   * Esto habilita y abre el menú identificado como 'main-menu'
   */
  openMenu() {
    this.menu.enable(true, 'main-menu');
    this.menu.open('main-menu');
  }

}
