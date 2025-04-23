import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  imports: [IonicModule],
  
})
export class MoviesPage implements OnInit {

  constructor(private movieService:MovieService) { }

  ngOnInit() {
  }

}
