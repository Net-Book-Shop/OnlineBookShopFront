import {Component, OnInit} from '@angular/core';
import {routes} from "../../../core/routes-path/routes";
import {BookService} from "../../../../api-service/service/BookService ";
import Swal from "sweetalert2";

class ngOnInit {
}

@Component({
  selector: 'app-customer-home-page',
  templateUrl: './customer-home-page.component.html',
  styleUrls: ['./customer-home-page.component.scss']
})
export class CustomerHomePageComponent  implements OnInit{
  protected readonly routes = routes;

  books: any[] = []; // All books loaded from the backend
  filteredBooks: any[] = []; // Filtered books displayed in the UI

  categoryList: any[] = [];
  subCategoryList: any[] = [];
  cart: any[] = [];

  selectedCategory: string | null = null; // Selected category
  selectedSubCategory: string | null = null; // Selected subcategory

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
    this.loadSubCategories();
  }

  loadCategories(): void {
    this.bookService.getAllCategory({}).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.categoryList = response.data || [];
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load categories.',
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching categories.',
          footer: `<strong>Details:</strong> ${err.error?.message || err.message || 'Unknown error'}`,
        });
      },
    });
  }

  loadSubCategories(): void {
    this.bookService.getAllSubCategory({}).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.subCategoryList = response.data || [];
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load subcategories.',
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching subcategories.',
          footer: `<strong>Details:</strong> ${err.error?.message || err.message || 'Unknown error'}`,
        });
      },
    });
  }

  loadBooks(): void {
    const payload = {
      CategoryName: null, // Can be adjusted if needed
      SubCategoryName: null,
    };

    this.bookService.GetAllBookCategoryWise(payload).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.books = response.data || [];
          this.filteredBooks = [...this.books];
        } else {
          console.error('Error fetching books:', response.message);
        }
      },
      (error) => {
        console.error('Error occurred while fetching books:', error);
      }
    );
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterBooks(query);
  }

  onCategoryChange(category: string | null): void {
    this.selectedCategory = category;
    this.filterBooks();
  }

  onSubCategoryChange(subCategory: string | null): void {
    this.selectedSubCategory = subCategory;
    this.filterBooks();
  }

  filterBooks(searchQuery: any = ''): void {
    this.filteredBooks = this.books.filter((book) => {
      const matchesSearch =
        book.bookName.toLowerCase().includes(searchQuery) ||
        book.description.toLowerCase().includes(searchQuery);
      const matchesCategory =
        !this.selectedCategory || book.categoryName === this.selectedCategory;
      const matchesSubCategory =
        !this.selectedSubCategory || book.subCategoryName === this.selectedSubCategory;

      return matchesSearch && matchesCategory && matchesSubCategory;
    });
  }
  addToCart(book: any): void {
    // Check if the book is already in the cart
    const existingBook = this.cart.find((item) => item.id === book.id);
    if (existingBook) {
      Swal.fire({
        icon: 'info',
        title: 'Already in Cart',
        text: `${book.bookName} is already in your cart.`,
      });
      return;
    }

    // Add book to the cart
    this.cart.push(book);

    // Show confirmation message
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${book.bookName} has been added to your cart.`,
    });

    console.log('Cart:', this.cart); // Optional: Debugging purpose
  }

}
