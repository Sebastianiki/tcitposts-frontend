import { 
    BEGIN_LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_ERROR,
    ADD_POST_SUCCESS,
    ADD_POST_ERROR,
    DELETE_POST_SUCCES,
    DELETE_POST_ERROR
} from '../types'
import clientAxios from '../config/axios'

export function getPosts(){
    return async(dispatch) =>{
        dispatch(listPosts())
        try {
            const response = await clientAxios.get('/posts')
            dispatch(listPostsSucces(response.data.data))
        } catch (error) {
            dispatch(listPostsError(error))
        }
    }
}

const listPosts = () => ({
    type: BEGIN_LIST_POSTS
})

const listPostsSucces = posts => ({
    type: LIST_POSTS_SUCCESS,
    payload: posts
})

const listPostsError = error => ({
    type: LIST_POSTS_ERROR,
    payload : error
})

export function addPost(post){
    return async(dispatch) =>{
        try {
            const response = await clientAxios.post('/posts', post)
            dispatch(addPostSuccess(response.data.data))
        } catch (error) {
            dispatch(addPostError(error))
        }
    }
}

const addPostSuccess = post => ({
    type: ADD_POST_SUCCESS,
    payload: post
})

const addPostError = error => ({
    type: ADD_POST_ERROR,
    payload: error
})

export function deletePost(id){
    return async(dispatch) =>{
        try {
            await clientAxios.delete(`/posts/${id}`)
            dispatch(deletePostSucces(id)) 
        } catch (error) {
            dispatch(deletePostError(error))
        }
    }
}

const deletePostSucces = id => ({
    type: DELETE_POST_SUCCES,
    payload: id
})

const deletePostError = error => ({
    type: DELETE_POST_ERROR,
    payload: error
})