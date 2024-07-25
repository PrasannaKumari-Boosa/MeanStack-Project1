import { Component, Input , OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit,OnDestroy {
 
  posts:Post[] = [];
  private postsSubscription:Subscription;

  constructor(public postservice:PostsService) { }

  ngOnInit() {
    this.postservice.getPosts();
    this.postsSubscription = this.postservice.getPostUpdateListener().
    subscribe((posts:Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {

    this.postsSubscription.unsubscribe();
    
  }

  onDelete(postID:string) {
    this.postservice.deletePost(postID);
  }

}
