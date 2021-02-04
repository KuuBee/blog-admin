import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService } from '@core';
import { AuthApiService } from '@core/api/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService,
    private _authApi: AuthApiService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this._authApi
      .create({
        password: this.password.value,
        name: this.username.value,
      })
      .subscribe(res => {
        console.log(res);
        const { userId, name, avatar, accessToken } = res.data;
        // Set user info
        this.settings.setUser({
          id: userId,
          name,
          avatar,
        });
        // Set token info
        this.token.set({ token: accessToken, userId, name });
        // Regain the initial data
        this.startup.load().then(() => {
          let url = this.token.referrer!.url || '/';
          if (url.includes('/auth')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      });
    return;
    const { token, uid, username } = { token: 'ng-matero-token', uid: 1, username: 'ng-matero' };
    // Set user info
    this.settings.setUser({
      id: uid,
      name: 'Zongbin',
      email: 'nzb329@163.com',
      avatar: './assets/images/avatar.jpg',
    });
    // Set token info
    this.token.set({ token, uid, username });
    // Regain the initial data
    this.startup.load().then(() => {
      let url = this.token.referrer!.url || '/';
      if (url.includes('/auth')) {
        url = '/';
      }
      this.router.navigateByUrl(url);
    });
  }
}
