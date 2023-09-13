import { ActionReducerMap } from '@ngrx/store'
import { PostsState, postsReducer } from './posts/posts.reducer'

export interface AppState {
    posts: PostsState
}

export const appReducer: ActionReducerMap<AppState> = {
    posts: postsReducer
}