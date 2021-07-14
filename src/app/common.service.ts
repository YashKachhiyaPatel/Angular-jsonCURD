import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Employee';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = 'http://localhost:3000/users'
  constructor(private _http: HttpClient) { }

  createUser(user: Employee): Observable<Employee>{
      return this._http.post<Employee>(this.apiUrl, user, httpOptions);
  }

  getAllUsers(): Observable<Employee[]>{
    return this._http.get<Employee[]>(this.apiUrl);
  }
  getOneUser(user:Employee): Observable<Employee>{
    return this._http.get<Employee>(this.apiUrl+"/"+user.id);
  }

  deleteUser(user: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${user.id}`;
    return this._http.delete<Employee>(url);
  }

  updateUser(user: Employee): Observable<Employee>{
    const url = `${this.apiUrl}/${user.id}`;
    return this._http.put<Employee>(url,user);
  }
}
