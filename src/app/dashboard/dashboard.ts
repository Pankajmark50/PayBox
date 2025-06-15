import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
    activeForm: string = 'dashboard';

      showDashboard() {
    this.activeForm = 'dashboard';
  }


  showAddMoney() {
    this.activeForm = 'add';
  }

  showSendMoney() {
    this.activeForm = 'send';
  }

}
