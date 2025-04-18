import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone:true
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();



  addToWishlist() {
    alert('Added to your wishlist!');
  }
  
}
