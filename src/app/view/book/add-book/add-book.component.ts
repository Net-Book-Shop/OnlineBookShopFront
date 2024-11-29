import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../api-service/service/BookService ";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit{
  addBookForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null; // Holds the image preview URL



  categoryList: any[] = [];
  subCategoryList: any[] = [];

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.addBookForm = this.fb.group({
      BookName: ['', Validators.required],
      Qty: [0, [Validators.required, Validators.min(1)]],
      CostPrice: [0.00, [Validators.required, Validators.min(0)]],
      SellingPrice: [0.00, [Validators.required, Validators.min(0)]],
      CategoryCode: ['', Validators.required],
      Description: [''],
      Supplier: [''],
      CategoryId: ['', Validators.required],
      SubCategoryId: ['', Validators.required],
      subCategoryName: [''],
      CategoryName: [''],
    });
  }

  ngOnInit(): void {
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
  loadSubCategories(){
    this.bookService.getAllSubCategory({}).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.subCategoryList = response.data|| [];
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
  // Handle Category Selection
  onCategoryChange(selectedCategory: any): void {
    console.log(selectedCategory.categoryCode)
    this.addBookForm.get('SubCategoryId')?.reset();
    this.addBookForm.get('CategoryCode')?.setValue('');
    this.addBookForm.get('CategoryName')?.setValue(selectedCategory.categoryName);
  }

  // Handle Sub-Category Selection
  onSubCategoryChange(selectedSubCategory: any): void {
    const selectedCategory = this.addBookForm.get('CategoryId')?.value;
    const categoryCode = selectedCategory.categoryCode;
    const subCategoryCode = selectedSubCategory.categoryCode;
    this.addBookForm.get('subCategoryName')?.setValue(selectedSubCategory.categoryName);

    this.addBookForm.get('CategoryCode')?.setValue(`${categoryCode}${subCategoryCode}`);
  }


  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Generate preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.addBookForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    this.bookService.addBook(this.addBookForm.value, this.selectedFile).subscribe({
      next: (response) => {
       console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Book added successfully!',
        }); // Clear the image preview
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error adding book. Please try again.',
          footer: `<strong>Details:</strong> ${err.error?.message || err.message || 'Unknown error'}`,
        });
      },
    });
  }
}
