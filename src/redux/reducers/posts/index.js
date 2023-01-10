import {createReducer} from "@reduxjs/toolkit";
import {addPost, removeCheckedPosts, removePost} from "../../actions/posts";

const initialState = {
    posts: [{title: 'Title'}, {title: 'Title2'}, {title: 'Title3'}]
}

// const postsReducer = (state = initialState, action) => {
//     switch (action.type) {
//         default:
//             return state
//     }
// }
// =>

const postsReducer = createReducer(initialState, builder => {
    builder
        .addCase(addPost, (state, action) => {
            return {
                ...state,
                posts: state.posts.concat(action.payload.post)
            }
        })
        .addCase(removePost, (state, action) => {
            return {
                ...state,
                posts: action.payload
            }
        })
        .addCase(removeCheckedPosts, (state, action) => {
            return {
                ...state,
                posts: action.payload
            }
        })
})

export default postsReducer