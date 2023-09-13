import { createReducer, on } from '@ngrx/store'
import * as PostsActions from './posts.actions'
import { Posts } from 'src/app/interfaces/posts'

export interface PostsState {
  posts: Posts[]
  loading: boolean
  error: Error | null
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
}

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state) => ({ ...state, loading: true })),
  on(PostsActions.loadPostsSuccess, (state, { posts }) => ({ ...state, posts, loading: false, error: null })),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(PostsActions.addPostSuccess, (state, { post }) => ({ ...state, posts: [...state.posts, post] })),
  on(PostsActions.deletePostSuccess, (state, { id }) => ({ ...state, posts: state.posts.filter((post) => post.id !== id) })),
  on(PostsActions.updatePostSuccess, (state, { id, title, description }) => ({
    ...state, posts: state.posts.map((post) => (post.id === id ? { ...post, title, description } : post)),
  }))
)
