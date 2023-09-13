import { Injectable } from '@angular/core'
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore'
import { Observable, from } from 'rxjs'
import { RawPosts } from 'src/app/interfaces/posts'

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private readonly firestore: Firestore) { }
  
  getPosts = () => {
    return collectionData(collection(this.firestore, 'posts'), {
      idField: 'id',
    }) as Observable<RawPosts[]>
  }

  createPost(title: string, description: string) {
    const postToBeCreated = {
      title,
      description,
  }
  
    return from(addDoc(collection(this.firestore, 'posts'), postToBeCreated))
  }

  updatePost(id: string, title: string, description: string) {
    return from(updateDoc(doc(this.firestore, `posts/${id}`), { title, description }))
  }

  deletePost(id: string) {
    return from(deleteDoc(doc(this.firestore, `posts/${id}`)))
  }
}
