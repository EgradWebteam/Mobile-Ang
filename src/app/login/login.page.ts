import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [IonicModule],
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  logMeIn(){
    // code for loggin in user goes hereeeee
    this.router.navigate(['/home'])
  }
}
