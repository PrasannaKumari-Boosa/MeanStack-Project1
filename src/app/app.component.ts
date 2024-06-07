import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  storedposts:Post[] = [];

  onPostAdded(post) {
    this.storedposts.push(post);
  }
}
