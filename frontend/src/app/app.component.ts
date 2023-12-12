import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private ApiService:ApiService, private menuController:MenuController) {}

  logout(){
    this.ApiService.logout();
    this.menuController.close('main-menu');
  }
}
