import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Posts } from 'src/app/interfaces/posts'
import { AppState } from 'src/app/store/app.state'
import { addPost, deletePost, loadPosts, updatePost } from 'src/app/store/posts/posts.actions'
import { selectLoading, selectPosts } from 'src/app/store/posts/posts.selectors'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  currentPosts: Posts[] = []
  loading: boolean = true

  newPost: { title: string, description: string } = {
    title: '',
    description: ''
  }
  editedPost: { id: string, title: string, description: string } | null = null

  isCreating: boolean = false
  isEditing: boolean = false

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadPosts())

    this.store.pipe(select(selectPosts)).subscribe((e) => (this.currentPosts = e))
    this.store.pipe(select(selectLoading)).subscribe((e) => (this.loading = e))
  }

  onUpdate(id: string, description: string, title: string) {
    this.store.dispatch(updatePost({ id, description, title }))
  }

  onCreate(description: string, title: string) {
    this.store.dispatch(addPost({ description, title }))
  }

  onDelete(id: string) {
    this.store.dispatch(deletePost({ id }))
  }

  toggleCreating(isCreating: boolean): void {
    if(this.isEditing){
      this.isEditing = false
    }
    this.isCreating = isCreating
  }

  toggleEditing(isEditing: boolean): void {
    if(this.isCreating){
      this.isCreating = false
    }
    this.isEditing = isEditing
  }

  onCreateOrUpdate(): void {
    if (this.isCreating) {
      this.onCreate(this.newPost.title, this.newPost.description)
      this.toggleCreating(false)
    } else if (this.isEditing && this.editedPost) {
      this.onUpdate(this.editedPost.id, this.editedPost.title, this.editedPost.description)
      this.toggleEditing(false)
    }
  }
}
