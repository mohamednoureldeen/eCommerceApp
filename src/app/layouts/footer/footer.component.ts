import { Component } from '@angular/core';
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: 'app-footer',
  imports: [ChatComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
