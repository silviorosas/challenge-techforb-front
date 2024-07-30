import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';




export interface UserDTO {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserResponse {
  responseCode: string;
  responseMessage: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private url = 'http://localhost:8080/api/auth';
  private url = 'https://challenge-techforb-backend.onrender.com/api/auth';
 
  constructor(private http: HttpClient) { }


  register(user: UserDTO): Observable<void> {
    return this.http.post<void>(`${this.url}`, user);
  }

  
  login(loginDto: LoginDto): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.url}/login`, loginDto).pipe(
      map(response => {
        if (response && response.responseMessage) {
          localStorage.setItem('authToken', response.responseMessage);
         // console.log("token",response.responseMessage)
        }
        return response;
      })
    );
}


getToken(): string | null {
  return localStorage.getItem('authToken');
}

logout(): void {
  localStorage.removeItem('authToken');
}


isLoggedIn(): boolean {
  console.log("isLogged:",!!localStorage.getItem('authToken'))
  return !!localStorage.getItem('authToken'); //para auth.guard  
}


}
