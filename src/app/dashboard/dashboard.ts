import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddMoney, SendMoney, Services, Transaction, TransactionResponse } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private services: Services,private router: Router ) { }

  activeForm: string = 'dashboard';
  userPhoneNumber: any;

  addMoneyModel = new AddMoney();

  sendMoneyModel = new SendMoney();

  currentBalance: string = " ";

  transactions: Transaction[] = [];

  toastMessage: string = '';
  toastType: string = '';

  lastUpdatedTime: Date | null = null;


  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;

    setTimeout(() => {
      this.toastMessage = '';
    }, 3000); // auto hide after 3 seconds
  }


  ngOnInit(): void {
    this.userPhoneNumber = sessionStorage.getItem("number");
    this.getallUsers();
    this.Balance();
    this.loadTransactions();
  }


  Balance() {
    this.services.balance(this.userPhoneNumber).subscribe(
      data => {
        this.currentBalance = data.result.amount;
      });
    this.updateLastUpdateTime();
  }

  loadTransactions() {
    this.services.getTransactions(this.userPhoneNumber).subscribe(data => {
      this.transactions = data.result;
    });
    this.updateLastUpdateTime();
  }

  deletetransid(tid: number){
    this.services.DeleteTransactionById(tid).subscribe(data=>{
      this.showToast("Transaction deleted Successfully!", 'success');
      this.loadTransactions();
    }, err=>{
      this.showToast('Failed to delete transaction.','error')
    });
  }

  Deletetrans(){
    this.services.DeleteTransaction(this.userPhoneNumber).subscribe(data=>{
    this.showToast("Transaction deleted Successfully!", 'success');
      this.loadTransactions();
    }, err=>{
      this.showToast('Failed to delete transaction.','error')
    })
  }

  userList:any;

  getallUsers(){
    this.services.getUserList().subscribe(data=>{
      this.userList=data.result;
    })
  }

  showDashboard() {
    this.activeForm = 'dashboard';
  }


  showAddMoney() {
    this.activeForm = 'add';
  }

  showSendMoney() {
    this.activeForm = 'send';
  }

  showTransactions(){
    this.activeForm= 'transactions';
  }

  updateLastUpdateTime() {
    this.lastUpdatedTime = new Date();
  }

  addMoney(form: AddMoney) {
    this.addMoneyModel.phoneNumber = this.userPhoneNumber;
    this.services.addMoney(this.addMoneyModel).subscribe(data => {
      this.showToast("Money Added Successfully!", 'success');
      this.Balance();
      this.loadTransactions();
    }, err => {
      this.showToast("Failed to add money!", 'error');
    });
  }

  sendMoney(form: SendMoney) {
    this.sendMoneyModel.senderPhoneNumber = this.userPhoneNumber;
    this.services.sendMoney(this.sendMoneyModel).subscribe(data => {
      this.showToast("Money Sent Successfully!", 'success');
      console.log(this.sendMoneyModel);
      this.Balance();
      this.loadTransactions();
    }, err => {
      this.showToast("Failed to send money!", 'error');
    });
  }

  @Output() loginEvent = new EventEmitter<string>();

  logout(){
    sessionStorage.removeItem("isloggedin");
    sessionStorage.removeItem("number");
    this.router.navigate(['/signin']);
    this.send(false);
  }

  send(val:any)
  {
    this.loginEvent.emit(val)
  }
}
