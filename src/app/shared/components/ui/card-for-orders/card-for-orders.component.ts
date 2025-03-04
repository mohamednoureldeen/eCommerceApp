import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { RouterLink } from '@angular/router';
import { Iproduct } from '../../../interfaces/iproduct';

@Component({
  selector: 'app-card-for-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './card-for-orders.component.html',
  styleUrls: ['./card-for-orders.component.scss'],
})
export class CardForOrdersComponent {
  // Injecting required services
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  // Input property to receive the list of products from the parent component
  @Input() products: Iproduct[] = [];
  
  // Array to store animated heart objects
  hearts: any[] = [];
  
  // Array to store IDs of products in the wishlist
  wishlistItems: string[] = [];

  ngOnInit(): void {
    // Load wishlist items when the component initializes
    this.loadWishlist();
  }

  // Function to add a product to the shopping cart
  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('Product added to cart successfully', 'Success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
        // Update the cart item count
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Function to load the wishlist items from the server
  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        // Extract product IDs from the response and store them in the wishlist array
        this.wishlistItems = response.data.map((product: any) => product.id);
      },
      error: (error) => console.error('Error loading wishlist:', error),
    });
  }

  // Check if a specific product is in the wishlist
  isItemInWishlist(id: string): boolean {
    return this.wishlistItems.includes(id);
  }

  // Function to add or remove a product from the wishlist
  toggleItemInWishlist(id: string, event: MouseEvent): void {
    if (this.isItemInWishlist(id)) {
      // If the product is already in the wishlist, remove it
      this.wishlistService.removeProductFromWishlist(id).subscribe({
        next: (response) => (this.wishlistItems = response.data),
        error: (error) => console.error('Error removing from wishlist:', error),
      });
    } else {
      // If not in wishlist, add the product and show the heart animation
      this.wishlistService.addProductToWishlist(id).subscribe({
        next: (response) => {
          this.wishlistItems = response.data;
          this.showMultipleHearts(event.clientX, event.clientY);
        },
        error: (error) => console.error('Error adding to wishlist:', error),
      });
    }
  }

  // Function to generate and display animated hearts when adding to the wishlist
  showMultipleHearts(x: number, y: number): void {
    const numHearts = 15; // Number of hearts to display
    const boundary = { minX: 0, maxX: window.innerWidth, minY: 0, maxY: window.innerHeight };

    for (let i = 0; i < numHearts; i++) {
      const offsetX = (Math.random() - 0.5) * 300; // Random horizontal position
      const offsetY = (Math.random() - 0.5) * 200; // Random vertical position
      const scale = Math.random() * 2.5 + 0.5; // Random size for the heart
      const duration = Math.random() * 2.5 + 1; // Random animation duration

      // Calculate the final position of the heart
      let heartX = x + offsetX;
      let heartY = y + offsetY;

      // Ensure the heart remains within the screen boundaries
      heartX = Math.max(boundary.minX, Math.min(boundary.maxX, heartX));
      heartY = Math.max(boundary.minY, Math.min(boundary.maxY, heartY));

      const heart = {
        id: Date.now() + i, // Unique ID for the heart
        x: heartX,
        y: heartY,
        scale,
        duration,
      };

      // Add the heart to the array for rendering
      this.hearts.push(heart);
    }

    // Automatically remove hearts after 3 seconds to prevent overflow
    setTimeout(() => {
      const currentTime = Date.now();
      this.hearts = this.hearts.filter((h: any) => h.id > currentTime);
    }, 3000);
  }
}

