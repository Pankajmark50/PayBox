import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Services {

  constructor(private http: HttpClient) { }
  url="https://localhost:7250"

    signupdetail(data:SignupModel):Observable<any>{
    return this.http.post<any>("https://localhost:7250/api/Auth/Register",data);
  }

  logindetail(data:LoginModel):Observable<any>{
    return this.http.post<any>("https://localhost:7250/api/Auth/Login", data);
  }

  addMoney(data:AddMoney):Observable<any>{
    return this.http.post<any>("https://localhost:7250/api/Wallet/add", data);
  }

    sendMoney(data:SendMoney):Observable<any>{
    return this.http.post<any>("https://localhost:7250/api/Transaction/pay", data);
  }

  balance(phoneNumber:string): Observable<any>{
    return this.http.get<any>(`${this.url}/api/User/Balance?phoneNumber=${phoneNumber}`)
  }

  getTransactions(phoneNumber: string): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this.url}/api/Transaction/history?phoneNumber=${phoneNumber}`);
  }

  getUserList():Observable<any>{
    return this.http.get<any>(this.url+'/api/User/usersList');
  }

  DeleteTransactionById(tid:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/api/Transaction/DeleteTransactionHistoryById?tid=${tid}`)
  }

  DeleteTransaction(phoneNumber: string):Observable<any>
  {
    return this.http.delete<any>(`${this.url}/api/Transaction/DeleteTransactionHistory?phoneNumber=${phoneNumber}`)
  }
}

export class SignupModel{
  username!: string
  email!: string
  phoneNumber!: string
  gender!: string
  password!: string
  imageUrl!: string
  isAdmin!: boolean
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

