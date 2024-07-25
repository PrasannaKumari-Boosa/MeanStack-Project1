import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  post:Post
  private postId: string;
  private mode = "create";

  constructor(public postservice:PostsService, public activatedRoute:ActivatedRoute){ }

  ngOnInit() {
   this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
    if(paramMap.has('postId')) {
      this.mode = 'edit';
      this.postId = paramMap.get('postId');
      this.post = this.postservice.getPost(this.postId)
    } else  {
      this.mode = 'create';
      this.postId = null;
    }
   })
    
  }

  onAddPost(form:NgForm) {
    if (form.invalid) {
      return;
    }
    this.postservice.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
