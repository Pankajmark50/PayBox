import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Services {

  constructor(private http: HttpClient) { }
  url="https://skytm-api.azurewebsites.net"

    signupdetail(data:SignupModel):Observable<any>{
    return this.http.post<any>(this.url+"/api/Auth/signup",data);
  }

  logindetail(data:LoginModel):Observable<any>{
    return this.http.post<any>(this.url+"/api/Auth/login", data);
  }

  addMoney(data:AddMoney):Observable<any>{
    return this.http.post<any>(this.url+"/api/Wallet/add", data);
  }

    sendMoney(data:SendMoney):Observable<any>{
    return this.http.post<any>(this.url+"/api/Transactions/pay", data);
  }

  balance(phoneNumber:string): Observable<any>{
    return this.http.get<any>(this.url+`/api/Users/balance?phoneNumber=${phoneNumber}`)
  }

  getTransactions(phoneNumber: string): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this.url}/api/Transactions/history?phoneNumber=${phoneNumber}`);
  }

  getUserList():Observable<any>{
    return this.http.get<any>(this.url+'/api/Users/basic-list');
  }

  DeleteTransactionById(tid:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/api/Transactions/DeleteTransectionById?tid=${tid}`)
  }

  DeleteTransaction(phoneNumber: string):Observable<any>
  {
    return this.http.delete<any>(`${this.url}/api/Transactions/history?phoneNumber=${phoneNumber}`)
  }
}

export class SignupModel{
  username!: string
  email!: string
  phoneNumber!: string
  gender!: string
  password!: string
}

export class LoginModel{
  phoneNumber!: string
  password!: string
}

export class AddMoney{
  phoneNumber!: string;
  amount!:0;
}

export class SendMoney{
  senderPhoneNumber!: string;
  receiverPhoneNumber!: string;
  amount!:0;
}

export interface Transaction {
  transactionId: number;
  userId: number;
  receiverId: number;
  receiverName: string;
  receiverPhoneNumber: string;
  transactionType: string;
  transactionDate: string;
  initialAmount: number;
  transferAmount: number;
}

export interface TransactionResponse {
  result: Transaction[];
  response: string;
  responseCode: string;
}

