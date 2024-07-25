import { Injectable } from '@angular/core';
import { Post } from './posts/post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private PostUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe((transformposts) => {
        this.posts = transformposts;
        this.PostUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.PostUpdated.asObservable();
  }

  getPost(id:string) {
    return{...this.posts.find(p => p.id === id)};
  }


  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const id  = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.PostUpdated.next([...this.posts]);
      });
  }

  deletePost(postId:string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.PostUpdated.next([...this.posts]);
    });
  }

}
