import { Component } from '@angular/core';
import {BookService} from "../../../../api-service/service/BookService ";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-book-report',
  templateUrl: './book-report.component.html',
  styleUrls: ['./book-report.component.scss']
})
export class BookReportComponent {
  books: any[] = []; // Holds the books data
  isLoading = true; // Loader flag

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    const payload = {
      categoryName: '',
      subCategoryName: '',
      fromDate: '',
      toDate: '',
      bookCode: ''
    }; // Request payload
    this.bookService.GetAllBookCategoryWise(payload).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.books = response.data || [];
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
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
    XLSX.utils.book_append_sheet(workbook, worksheet, reportName);

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

