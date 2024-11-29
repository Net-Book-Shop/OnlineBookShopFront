import {Component, OnInit} from '@angular/core';
import {routes} from "../../../core/routes-path/routes";
import {BookService} from "../../../../api-service/service/BookService ";
import Swal from "sweetalert2";
import {OrderService} from "../../../../api-service/service/OrderService";


@Component({
  selector: 'app-customer-home-page',
  templateUrl: './customer-home-page.component.html',
  styleUrls: ['./customer-home-page.component.scss']
})
export class CustomerHomePageComponent implements OnInit {
  protected readonly routes = routes;

  books: any[] = []; // All books loaded from the backend
  filteredBooks: any[] = []; // Filtered books displayed in the UI

  categoryList: any[] = [];
  subCategoryList: any[] = [];
  cart: any[] = [];

  selectedCategory: string | null = null; // Selected category
  selectedSubCategory: string | null = null; // Selected subcategory
  selectedBook: any | null = null;

  customerDetails = {
    mobileNumber: '',
    city: '',
    name: '',
    email: '',
    address: '',
  };
  paymentMethod = ''; // Example payment method
  deliveryFee = 350; // Example delivery fee
  discount = 0; // Example discount
  bankTransactionId = '';

  newReview = {
    review: '',
    rating: 0,
    bookCode: '',
    customerName: '',
    mobileNumber: '',
  };
  showAddReviewSection  = false;
  constructor(private bookService: BookService, private orderService: OrderService) {
  }


  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
    this.loadSubCategories();
  }

  showBookDetails(book: any): void {
    this.selectedBook = book;
  }

  showReviews(book: any) {
    this.selectedBook = book;
    this.newReview.bookCode = book.bookCode;
    this.showAddReviewSection = false;
  }
  toggleAddReviewSection() {
    this.showAddReviewSection = !this.showAddReviewSection; // Toggle the visibility
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
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
    const existingBook = this.cart.find((item) => item.id === book.id);
    if (existingBook) {
      Swal.fire({
        icon: 'info',
        title: 'Already in Cart',
        text: `${book.bookName} is already in your cart.`,
      });
      return;
    }

    this.cart.push({...book, qty: 1}); // Initialize quantity as 1
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${book.bookName} has been added to your cart.`,
    });
  }


  // ===========
  decreaseQty(book: any): void {
    if (book.qty > 1) {
      book.qty -= 1;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Minimum Quantity Reached',
        text: 'The quantity cannot be less than 1.',
      });
    }
  }

  increaseQty(book: any): void {
    book.qty += 1;
  }

  removeFromCart(book: any): void {
    this.cart = this.cart.filter((item) => item.id !== book.id);
    Swal.fire({
      icon: 'success',
      title: 'Removed',
      text: `${book.bookName} has been removed from your cart.`,
    });
  }

  calculateTotal(): number {
    return this.cart.reduce((total, book) => total + book.sellingPrice * book.qty, 0);
  }

  calculateTotalWithDelivery() {
    return this.calculateTotal() + this.deliveryFee;
  }

  navigateTo(tabId: string) {
    const tab = document.getElementById(tabId) as HTMLElement;
    tab?.click();
  }

  prepareOrderPayload() {
    return {
      orderCode: '', // Generate this if required
      totalQty: this.cart.reduce((sum, item) => sum + item.qty, 0),
      customerName: this.customerDetails.name,
      address: this.customerDetails.address,
      mobileNumber: this.customerDetails.mobileNumber,
      customerEmail: this.customerDetails.email,
      deliveryFee: this.deliveryFee,
      paymentMethod: this.paymentMethod,
      bankTransactionId: this.paymentMethod === 'Bank' ? this.bankTransactionId : '',
      discount: this.discount,
      orderAmount: this.calculateTotal(),
      totalCostPrice: this.cart.reduce((sum, item) => sum + item.costPrice * item.qty, 0), // Adjust `costPrice` as per your data structure
      orderDetails: this.cart.map((item) => ({
        bookCode: item.bookCode,
        qty: item.qty,
        unitCostPrice: item.costPrice,
        unitSellingPrice: item.sellingPrice,
        total: item.sellingPrice * item.qty,
      })),
      customer: {
        name: this.customerDetails.name,
        email: this.customerDetails.email,
        address: this.customerDetails.address,
        city: this.customerDetails.city,
        mobileNumber: this.customerDetails.mobileNumber,
      },
    };
  }

  placeOrder() {
    const payload = this.prepareOrderPayload();

    this.orderService.SaveOrder(payload).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Order Placed',
            text: `Your order has been placed successfully! Order ID: ${response.data}`,
            confirmButtonText: 'OK',
          }).then(() => {
            // Optionally, clear cart and reset form
            this.cart = [];
            this.customerDetails = {
              name: '',
              address: '',
              mobileNumber: '',
              email: '',
              city: '',
            };
          });
        }
      },
      (error) => {
        console.error('Error placing order', error);
        Swal.fire({
          icon: 'error',
          title: 'Order Failed',
          text: 'There was an error placing your order. Please try again later.',
          confirmButtonText: 'OK',
        });
      }
    );
  }


  submitReview() {
    if (this.newReview.rating > 5 || this.newReview.rating < 1) {
      Swal.fire('Error', 'Rating must be between 1 and 5.', 'error');
      return;
    }

    this.orderService.AddBookReviewAndRating(this.newReview).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {

          Swal.fire('Success', 'Your review has been submitted!', 'success');
          // Update the reviews list dynamically
          this.selectedBook.reviews.push({...this.newReview});
          // Reset the form
          this.newReview = {
            review: '',
            rating: 0,
            bookCode: this.selectedBook.bookCode,
            customerName: '',
            mobileNumber: '',
          };
        }

      },
      error: (err) => {
        Swal.fire('Error', 'Failed to submit review.', 'error');
      },
    });
  }


}
