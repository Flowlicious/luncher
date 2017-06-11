export class OrderUser {
  public displayName: string;
  public email: string;
  public uid?: string;
  public password?: string;
  constructor(fireUser: any) {
    this.uid = fireUser.uid;
    this.displayName = fireUser.displayName;
    this.email = fireUser.email;
  }


}
