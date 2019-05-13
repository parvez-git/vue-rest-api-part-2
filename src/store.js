import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default new Vuex.Store({
    state: {
        authid: 1,
        posts: [],
        categories: [],
        tags: [],
        opencreatepostdialog: false,
        openupdatepostdialog: false,
        opendeletepostdialog: false
    },
    mutations: {
        setPostList(state, payload) {
            state.posts = payload
        },
        setCategoryList(state, payload) {
            state.categories = payload
        },
        setTagsList(state, payload) {
            state.tags = payload
        },
        setOpenCreatePostDialog(state, payload) {
            state.opencreatepostdialog = payload
        },
        setNewPost(state, payload) {
            state.posts.unshift(payload)
        },
        setOpenUpdatePostDialog(state, payload) {
            state.openupdatepostdialog = payload
        },
        setUpdatePost(state, { index, post }) {
            state.posts.splice(index, 1, post)
        },
        setOpenDeletePostDialog(state, payload) {
            state.opendeletepostdialog = payload
        },
        setDeletePost(state, payload) {
            state.posts.splice(payload, 1)
        }
    },
    actions: {
        postList(context) {
            axios.get('/posts')
                .then((response) => {
                    context.commit('setPostList', response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        categoryList(context) {
            axios.get('/categories')
                .then((response) => {
                    context.commit('setCategoryList', response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        tagList(context) {
            axios.get('/tags')
                .then((response) => {
                    context.commit('setTagsList', response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        createPostDialog(context, payload) {
            context.commit('setOpenCreatePostDialog', payload)
        },
        createPost(context, payload) {
            axios.post('/posts', {
                    user_id: this.state.authid,
                    title: payload.title,
                    description: payload.description,
                    category_id: payload.categoryid,
                    tags: payload.tagids
                })
                .then((response) => {
                    context.commit('setNewPost', response.data)
                    context.commit('setOpenCreatePostDialog', false)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        updatePostDialog(context, payload) {
            context.commit('setOpenUpdatePostDialog', payload)
        },
        updatePost(context, payload) {
            axios.patch('/posts/' + payload.id, {
                    title: payload.title,
                    description: payload.description,
                    category_id: payload.categoryid,
                    tags: payload.tagids
                })
                .then((response) => {
                    const index = payload.index
                    const post = response.data
                    context.commit('setUpdatePost', { index, post })
                    context.commit('setOpenUpdatePostDialog', false)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        deletePostDialog(context, payload) {
            context.commit('setOpenDeletePostDialog', payload)
        },
        deletePost(context, payload) {
            axios.delete('/posts/' + payload.id)
                .then((response) => {
                    console.log(response.data)

                    context.commit('setDeletePost', payload.index)
                    context.commit('setOpenDeletePostDialog', false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    getters: {
        getPostList(state) {
            return state.posts
        },
        getcategoryList(state) {
            return state.categories
        },
        getTagList(state) {
            return state.tags
        },
        getCreatePostDialog(state) {
            return state.opencreatepostdialog
        },
        getUpdatePostDialog(state) {
            return state.openupdatepostdialog
        },
        getDeletePostDialog(state) {
            return state.opendeletepostdialog
        }
    }
})