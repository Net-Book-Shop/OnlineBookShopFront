import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../api-service/service/UserService";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit{
  customers: any[] = []; // Holds the full list of customers
  filteredCustomers: any[] = []; // Holds the filtered list of customers
  searchQuery  = ''; // Search input value

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadCustomerList();
  }

  loadCustomerList(): void {
    const body = {}; // Adjust the payload if necessary
    this.userService.GetCustomerList(body).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.customers = response.data || [];
          this.filteredCustomers = [...this.customers]; // Initialize filtered list
        } else {
          Swal.fire('Error', 'Failed to load customer data.', 'error');
        }
      },
      (error) => {
        Swal.fire(
          'Error',
          `Error fetching customers: ${error.message || 'Unknown error'}`,
          'error'
        );
      }
    );
  }

  filterCustomers(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredCustomers = this.customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.address.toLowerCase().includes(query) ||
        customer.mobileNumber.toLowerCase().includes(query)
      );
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


