import {createAction} from "@reduxjs/toolkit";

export const addPost = createAction('ADD_POST')
export const removePost = createAction('REMOVE_POST')
export const removeCheckedPosts = createAction('REMOVE_CHECKED_POSTS')