import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, Timestamp } from '@angular/fire/firestore'
import * as PostsActions from './posts.actions'
import { PostsService } from 'src/app/services/posts.service'
import { Posts } from 'src/app/interfaces/posts'

@Injectable()
export class PostsEffects {
    constructor(
        private actions$: Actions,
        private firestore: Firestore,
        private postsService: PostsService
    ) { }

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsActions.loadPosts),
            switchMap(() =>
                this.postsService.getPosts().pipe(
                    map((data) => {
                        console.log(data)
                        const posts: Posts[] = data.map((taskDocument) => {
                            return {
                                id: taskDocument.id,
                                title: taskDocument.title,
                                description: taskDocument.description,
                                upvotes: taskDocument.upvotes,
                                downvotes: taskDocument.downvotes,
                                timeStamp: taskDocument.timeStamp.toDate(),
                            }
                        })
                        return PostsActions.loadPostsSuccess({ posts: posts })
                    })
                )
            )
        )
    )

    addPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsActions.addPost),
            switchMap(async ({ title, description }) => {
                const dateNow = new Date()
                const postToBeCreated = {
                    title,
                    description,
                    upvotes: 0,
                    downvotes: 0,
                    timeStamp: Timestamp.fromDate(dateNow),
                }

                const postForState = {
                    ...postToBeCreated,
                    timeStamp: dateNow,
                }

                const docRef = await addDoc(collection(this.firestore, 'posts'), postToBeCreated)
                const newPost = { ...postForState, id: docRef.id }
                return PostsActions.addPostSuccess({ post: newPost })
            }),
            catchError((error) => of(PostsActions.addPostFailure({ error })))
        )
    )

    deletePost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsActions.deletePost),
            switchMap(async ({ id }) => {
                await deleteDoc( doc(this.firestore, `posts/${id}`))
                return PostsActions.deletePostSuccess({ id })
            }),
            catchError((error) => of(PostsActions.deletePostFailure({ error })))
        )
    )

    updatePost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsActions.updatePost),
            switchMap(async ({ id, title, description }) => {
                await updateDoc(doc(this.firestore, `posts/${id}`), { title, description })
                return PostsActions.updatePostSuccess({ id, title, description })
            }),
            catchError((error) => of(PostsActions.updatePostFailure({ error })))
        )
    )
}
