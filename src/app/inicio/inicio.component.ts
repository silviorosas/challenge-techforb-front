import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginDto } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,NgFor,NgIf,FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})


export class InicioComponent {
  
  loginDto: LoginDto = {
    email: '',
    password: ''
  };
  
  errorMessage: string | null = null;  

  
  email!: string;
  password!: string;

  constructor(  
    private router: Router,  
    private authService: AuthService,
    private tokenService: TokenService,
    //private toastr: ToastrService,
     ) { }
  
  
  onLogin(): void {
    console.log("Login DTO antes de enviar:", this.loginDto); // Agrega este log para depurar
    this.authService.login(this.loginDto).subscribe(
      response => {
        /* this.toastr.success('Login exitoso!!', 'Éxito', {
          positionClass: 'toast-top-center',
        }); */
        console.log('Inicio de sesión exitoso:');
        this.tokenService.setToken(response.responseMessage);
        this.router.navigate(['/dashboard']);
        
      },
      error => {
       /*  this.toastr.error(error.error, 'Error', {
          positionClass: 'toast-top-center'
        }); */
        this.errorMessage = 'Login failed: ' + (error.error || error.message);
        console.error('Login error:', error);
      }
    );
  }

}
