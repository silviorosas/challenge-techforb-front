import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginDto, UserDTO } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  
  registerDto: UserDTO = {
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  };

  
  email!: string;
  password!: string;
  showRegisterModal!: boolean;

  constructor(  
    private router: Router,  
    private authService: AuthService,
    private tokenService: TokenService,
    private toastr: ToastrService,
     ) { }
  
  
  onLogin(): void {   
    this.authService.login(this.loginDto).subscribe(
      response => {
        this.toastr.success('Login exitoso!!', 'Éxito', {
          positionClass: 'toast-top-center',
        });       
        this.tokenService.setToken(response.responseMessage);
        this.router.navigate(['/dashboard']);
        
      },
      error => {
       this.toastr.error(error.error, 'Error', {
          positionClass: 'toast-top-center'
        });        
      }
    );
  }

  //Modal
  openRegisterModal() {
    this.showRegisterModal = true;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }


  register(): void {
    console.log("Registro antes de enviar:", this.registerDto); // Agrega este log para depurar
    if (this.registerDto.nombre && this.registerDto.apellido && this.registerDto.email && this.registerDto.password) {      
    this.authService.register(this.registerDto).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        this.toastr.success('Registro exitoso! Ahora logueate!', 'Éxito', {
          positionClass: 'toast-top-center',
        });
        this.closeRegisterModal();
        this.resetRegisterForm();
       
      },
      error => {       
        console.error('register error:', error);
        console.log('Registro error:', error.error);
        this.toastr.error(error.error, 'Error', {
          positionClass: 'toast-top-center'
        });
      }
    );
  }
  }

  resetRegisterForm(): void {
    this.registerDto = {
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    };
  }

}
