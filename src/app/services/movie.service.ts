import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }
  // service
  getTopRatedMovies():Observable<any>{
    return this.http.get('');
  }


  getMovieDetails(){

  }




}
