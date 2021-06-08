import { 
    BEGIN_LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_ERROR,
    ADD_POST_SUCCESS,
    ADD_POST_ERROR,
    DELETE_POST_SUCCES,
    DELETE_POST_ERROR
} from '../types'

const initialState = {
    posts : [],
    error : null
}

const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case BEGIN_LIST_POSTS:
            return{
                ...state,
                loading : true
            }
        case LIST_POSTS_ERROR:
        case ADD_POST_ERROR:
        case DELETE_POST_ERROR:
            return{
                ...state,
                error : action.payload
            } 
        case LIST_POSTS_SUCCESS:
            return{
                ...state,
                error: null,
                loading: false,
                posts: action.payload
            }
        case ADD_POST_SUCCESS:
            return{
                ...state,
                posts: [...state.posts, action.payload]
            }
        case DELETE_POST_SUCCES:
            return{
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            }
        default:
            return state
    }
}

export default postsReducer