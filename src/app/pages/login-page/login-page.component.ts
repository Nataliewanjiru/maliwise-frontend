import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';  




@Component({
  selector: 'app-login-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  standalone:true
})
export class LoginPageComponent {

  constructor(public userService: UserService,public router : Router) { }

  model ={
    email :'',
    password:''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string | undefined;

  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/dashboard');
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      (      res: { [x: string]: any; }) => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/dashboard');
      },
      (      err: { error: { message: string | undefined; }; }) => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  
  goToRegister() {
    this.router.navigate(['/register']);
  }

}

