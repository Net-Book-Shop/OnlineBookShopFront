import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../api-service/service/BookService ";
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit{
  fromDate = '';
  toDate = '';
  bookCode = '';
  books: any[] = [];
  isLoading = false;
  editMode: { [bookCode: string]: boolean } = {};

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    const payloads = {
      fromDate: null,
      toDate: null,
      bookCode:  null,
    };
    this.loadTableData(payloads)
  }

  enableEdit(bookCode: string): void {
    this.editMode[bookCode] = true;
  }

  cancelEdit(bookCode: string): void {
    this.editMode[bookCode] = false;
    // Optionally, refresh book data from API or revert changes
  }
  // Search books based on filters
  searchBooks(): void {
    if (!this.fromDate || !this.toDate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select both From Date and To Date.',
      });
      return;
    }

    const payload = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      bookCode: this.bookCode.trim() || null,
    };

    this.isLoading = true;
    this.loadTableData(payload)

  }

  loadTableData(payload:any){
    this.bookService.GetAllBookDateAndCodeWise(payload).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.books = response.data || [];
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message || 'Failed to fetch data.',
          });
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching books:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching books.',
        });
        this.isLoading = false;
      }
    );
  }

  // Update a single book
  updateBook(book: any): void {
    const payload = {
      bookCode: book.bookCode,
      qty: book.qty,
      costPrice: book.costPrice,
      sellingPrice: book.sellingPrice,
    };

    this.bookService.UpdateBookDetail(payload).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Book details updated successfully.!',
          });
          this.editMode[book.bookCode] = false;

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message || 'Failed to update book details.',
          });
        }
      },
      (error) => {
        console.error('Error updating book details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating book details.',
        });
      }
    );
  }
}
