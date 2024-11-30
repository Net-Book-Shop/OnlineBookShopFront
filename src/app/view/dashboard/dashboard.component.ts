import {Component, OnInit} from '@angular/core';
import { DashboardService } from 'src/api-service/service/DashboardService';
import { routes } from 'src/app/core/routes-path/routes';
import Swal from "sweetalert2";
import {BookService} from "../../../api-service/service/BookService ";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  public routes = routes;

  public LastMonthProfit = 0;
  public TotaDeliveryFee = 0;
  public TotalCostPrice = 0;
  public TotaDiscount = 0;
  public TotaOrderAmunt = 0;
  public TotaCustomer = 0;
  public TotaBook = 0;


  constructor( private dashboardService: DashboardService,private bookService:BookService) {

  } ngOnInit(): void {
    this.fetchDashboardData();
    this.loadBooks();
  }

  loadBooks(): void {
    const payload = {
      CategoryName: null, // Can be adjusted if needed
      SubCategoryName: null,
    };

    this.bookService.GetAllBookCategoryWise(payload).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.TotaBook = response.data.length
        } else {
          console.error('Error fetching books:', response.message);
        }
      },
      (error) => {
        console.error('Error occurred while fetching books:', error);
      }
    );
  }

  fetchDashboardData(): void {
    this.dashboardService.GetIncomeAndLastMonthProfit().subscribe({
      next: (response) => {
        if (response.statusCode==200) {
          const data = response.data;
          this.LastMonthProfit = data.lastMonthProfit || 0;
          this.TotaOrderAmunt = data.totaOrderAmunt || 0;
          this.TotaCustomer = data.totaCustomer || 0;
        } else {
          Swal.fire('Error', response.message || 'Failed to load dashboard data.', 'error');
        }
      },
      error: (err) => {
        Swal.fire('Error', 'Unable to fetch dashboard data.', 'error');
      },
    });
  }

}
