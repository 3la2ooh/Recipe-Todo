import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { AuthService, AuthResponseData } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  @ViewChild("f") authForm: NgForm;
  isSignUpMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.error = null;
    this.isSignUpMode = !this.isSignUpMode;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isSignUpMode) {
      authObservable = this.authService.signUp(email, password);
    } else {
      authObservable = this.authService.login(email, password);
    }

    authObservable.subscribe(
      (responseData) => {
        this.isLoading = false;
        console.log(responseData);
        this.router.navigate(["/recipes"]);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
