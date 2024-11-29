import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../../api-service/service/BookService ";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  subCategoryForm: FormGroup;
  categories: any[] = [];
  subcategories: any[] = [];

  constructor(private fb: FormBuilder, private bookService: BookService) {
    // Initialize Category Form
    this.categoryForm = this.fb.group({
      CategoryName: ['', Validators.required],
      CategoryCode: ['', [Validators.required, Validators.pattern('^[A-Z]{2}$')],
      ],
    });

    // Initialize Sub-Category Form
    this.subCategoryForm = this.fb.group({
      SubCategoryName: ['', Validators.required],
      SubCategoryCode: ['', Validators.required],
    });
    this.categoryForm.get('CategoryCode')?.valueChanges.subscribe((value) => {
      if (value) {
        this.categoryForm.get('CategoryCode')?.setValue(value.toUpperCase(), {
          emitEvent: false, // Prevents infinite loop of valueChanges
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubcategories();
  }

  // Handle Add Category
  onAddCategory(): void {
    if (this.categoryForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    const payload = this.categoryForm.value;

    this.bookService.addCategory(payload).subscribe({
      next: (response: any) => {
        if (response?.statusCode === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Category added successfully!',
          });
          this.categoryForm.reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response?.Message || 'Failed to add category.',
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding the category.',
          footer: `<strong>Details:</strong> ${err.error?.message || err.message}`,
        });
      },
    });
  }

  // Handle Add Sub-Category
  onAddSubCategory(): void {
    if (this.subCategoryForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    const payload ={
      CategoryCode:this.subCategoryForm.get('SubCategoryCode')?.value,
      CategoryName:this.subCategoryForm.get('SubCategoryName')?.value,

    }

    this.bookService.addSubCategory(payload).subscribe({
      next: (response: any) => {
        if (response?.statusCode === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Sub-Category added successfully!',
          });
          this.subCategoryForm.reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response?.Message || 'Failed to add sub-category.',
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding the sub-category.',
          footer: `<strong>Details:</strong> ${err.error?.message || err.message}`,
        });
      },
    });
  }

  // Load categories from the service
  loadCategories(): void {
    this.bookService.getAllCategory({}).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.categories = response.data || [];
        } else {
          console.error('Failed to fetch categories:', response.message);
        }
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  // Load subcategories from the service
  loadSubcategories(): void {
    this.bookService.getAllSubCategory({}).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.subcategories = response.data || [];
        } else {
          console.error('Failed to fetch subcategories:', response.message);
        }
      },
      error: (err) => {
        console.error('Error fetching subcategories:', err);
      }
    });
  }

  exportToExcel(reportList: any,reportName:any) {
    if (reportList.length === 0) {
      Swal.fire('Error', 'No data available to export', 'error');
      return;
    }
    // Convert the tripReports array to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(reportList);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trip Reports');

    // Generate a buffer for the Excel file
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

    // Create a blob from the buffer and trigger the download
    this.saveAsExcelFile(excelBuffer, reportName);
  }

  // Method to save the Excel file using file-saver
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }

}

// MIME type for Excel files
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

