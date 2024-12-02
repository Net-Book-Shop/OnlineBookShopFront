export class routes {
  private static base = '';

  public static get baseUrl(): string {
    return this.base;
  }
  // auth routes
  public static get auth(): string {
    return this.base + '/auth';
  }
  public static get signIn(): string {
    return this.base + '/signin';
  }
  public static get signUp(): string {
    return this.base + '/signup';
  }
  public static get forgotPassword(): string {
    return this.base + '/forgetpassword';
  }
  // auth routes *ends*

  // error pages routes

  public static get errorPages(): string {
    return this.baseUrl + '/errorpages';
  }
  public static get errorPage404(): string {
    return this.errorPages + '/error404';
  }
  public static get errorPage500(): string {
    return this.errorPages + '/error500';
  }

  public static get core(): string {
    return this.baseUrl;
  }

  public static get dashboard(): string {
    return this.core + '/dashboard';
  }


  public static get customer(): string {
    return this.core + '/customer';
  }
  public static get viewCustomers(): string {
    return this.customer + '/view-customer';
  }

  public static get customerHomePage(): string {
    return this.base + '/customer-home-page';
  }



  public static get users(): string {
    return this.core + '/user';
  }

  public static get addUser(): string {
    return this.users + '/add-user';
  }
  public static get userPrivilege(): string {
    return this.users + '/user-privilege';
  }
  public static get customerList(): string {
    return this.users + '/customer-lists';
  }

  public static get updateProfile(): string {
    return this.users + '/update-profile';
  }
  public static get addVehicle(): string {
    return this.users + '/add-vehicle';
  }

  public static get report(): string {
    return this.core + '/report';
  }

  public static get orderReport(): string {
    return this.report + '/order-report';
  }

  public static get customerReport(): string {
    return this.report + '/customer-list';
  }
  public static get bookReviewReport(): string {
    return this.report + '/book-review-report';
  }
  public static get bookReport(): string {
    return this.report + '/book-report';
  }

  public static get book(): string {
    return this.core + '/book';
  }

  public static get addBook(): string {
    return this.book + '/add-book';
  }
  public static get viewBook(): string {
    return this.book + '/view-book';
  }
  public static get category(): string {
    return this.book + '/category';
  }

  public static get order(): string {
    return this.core + '/order';
  }
  public static get viewOrder(): string {
    return this.order + '/view-order';
  }












}
