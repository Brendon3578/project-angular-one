import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  title = 'Projeto Angular One 🚀';

  links = [
    { link: 'home', label: 'Home' },
    { link: 'dashboard', label: 'Dashboard' },
    { link: 'product', label: 'Produtos' },
  ];
}
