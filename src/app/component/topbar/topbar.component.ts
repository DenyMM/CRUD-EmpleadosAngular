import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../module/Material.Module';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink,MaterialModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

}
