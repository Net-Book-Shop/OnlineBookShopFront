import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../../api-service/service/OrderService";
import Swal from "sweetalert2";

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit{
  fromDate = '';
  toDate = '';
  orderCode = '';
  status = '';
  createUser='';
  orders: any[] = [];
  isLoading = false;
  editMode: { [key: string]: boolean } = {};
  selectedOrder: any = null;

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

  loadTableData(payload: any) {
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

  enableEdit(orderCode: string) {
    this.editMode[orderCode] = true;
  }

  saveOrder(order: any) {
    // Call API to update the order status
    this.orderService.UpdateOrderStatus(order).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          alert('Order updated successfully.');
          Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `Order updated successfully.`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update order.',
          });
        }
        this.editMode[order.orderCode] = false;
      },
      (error) => {
        console.error('Error updating order:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred.',
        });
        this.editMode[order.orderCode] = false;
      }
    );
  }

  getStatusOptions(currentStatus: string): string[] {
    switch (currentStatus) {
      case 'Pending':
        return ['Picked up', 'Reject'];
      case 'Picked up':
        return ['Delivered', 'Cancel'];
      case 'Delivered':
        return ['Cancel'];
      default:
        return [];
    }
  }

  cancelEdit(orderCode: string) {
    this.editMode[orderCode] = false;
    // Optionally reload the order to revert unsaved changes
    this.searchOrders();
  }

  viewOrderDetails(order: any) {
    this.selectedOrder = order;
  }
}
