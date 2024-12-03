import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../../api-service/service/OrderService";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit{
  fromDate = '';
  toDate = '';
  orderCode = '';
  createUser = '';
  isLoading = false;
  orders: any[] = [];
  status = '';
  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    const payload = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      orderCode: this.orderCode,
      status: this.status,
      createUser: this.createUser,
    };
    this.loadTableData(payload);
  }

  searchOrders() {
    this.isLoading = true;
    const payload = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      orderCode: this.orderCode,
      status: this.status,
      createUser: this.createUser,
    };
    this.loadTableData(payload);
  }

  loadTableData(payload:any){
    this.orderService.GetStatusWiseOrderList(payload).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.orders = response.data;
        } else {
          this.orders = [];
        }
        this.isLoading = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching orders:',
        });
        this.isLoading = false;
      }
    );
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

