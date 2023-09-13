import { createAction, props } from '@ngrx/store'
import { Posts } from 'src/app/interfaces/posts'

export const loadPosts = createAction('[Posts] Load Posts')
export const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts: Posts[] }>())
export const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: any }>())
export const addPost = createAction('[Posts] Add Post', props<{ title: string, description: string }>())
export const addPostSuccess = createAction('[Posts] Add Post Success', props<{ post: Posts }>())
export const addPostFailure = createAction('[Posts] Add Post Failure', props<{ error: any }>())
export const updatePost = createAction('[Posts] Update Post', props<{ id: string, title: string, description: string }>())
export const updatePostSuccess = createAction('[Posts] Update Post Success', props<{ id: string, title: string, description: string }>())
export const updatePostFailure = createAction('[Posts] Update Post Failure', props<{ error: any }>())
export const deletePost = createAction('[Posts] Delete Post', props<{ id: string }>())
export const deletePostSuccess = createAction('[Posts] Delete Post Success', props<{ id: string }>())
export const deletePostFailure = createAction('[Posts] Delete Post Failure', props<{ error: any }>())
