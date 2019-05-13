<template>
    <div class="blog">
        <div v-for="(post, index) in posts" :key="post.id" class="mb-12 sm:mb-16">
            <div class="flex justify-between">
                <div>
                    <h2 class="text-grey-darkerest text-2xl sm:text-4xl font-thin">{{ post.title }}</h2>
                    <div class="mt-2 mb-6 text-grey-darker text-sm uppercase">
                        <span>By {{ post.user.name }} at {{ post.created_at }}</span>
                        <span class="ml-2">Category: {{ post.category.name }}</span>
                        <span class="ml-2">Tags: 
                            <span v-for="tag in post.tags" :key="tag.id">
                                {{ tag.name }}
                            </span>
                        </span>
                    </div>
                    <p class="text-grey-darkest">{{ post.description }}</p>
                    <button type="button" class="px-4 py-2 mt-4 bg-white border border-red text-red uppercase text-xs font-semibold focus:outline-none">Read More</button>
                </div>
                <div class="flex items-start ml-4">
                    <button @click="openUpdatePostDialog(post, index)" type="button" class="mt-4 text-orange focus:outline-none">
                        <svg class="block h-4 w-4 feather feather-edit-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </button>
                    <button @click="openDeletePostDialog(post, index)" type="button" class="mt-4 ml-2 text-red focus:outline-none">
                        <svg class="block h-4 w-4 feather feather-trash-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
            </div>
        </div>

        <post-update v-show="openupdatepostdialog" :editpost="editpost"></post-update>
        <post-delete v-show="opendeletepostdialog" :deletepost="deletepost"></post-delete>

    </div>
</template>

<script>
    import UpdatePost from '@/components/UpdatePost.vue'
    import DeletePost from '@/components/DeletePost.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'blog',
        components: {
            'post-update': UpdatePost,
            'post-delete': DeletePost
        },
        data() {
            return {
                title: '',
                description: '',
                categoryid: '',
                tagids: [],
                pagination: [],
                editpost: {},
                deletepost:{}
            }
        },
        computed: {
            ...mapGetters({
                posts: 'getPostList',
                categories: 'getcategoryList',
                tags: 'getTagList'
            }),
            openupdatepostdialog() {
                return this.$store.getters.getUpdatePostDialog
            },
            opendeletepostdialog() {
                return this.$store.getters.getDeletePostDialog
            }
        },
        methods: {
            openUpdatePostDialog(post, index) {
               this.$store.dispatch('updatePostDialog', true)

               this.editpost = {
                   index: index,
                   id: post.id,
                   title: post.title,
                   description: post.description,
                   categoryid: post.category_id,
                   tags: post.tags
               }
               this.$emit('editpost', this.editpost)
            },
            openDeletePostDialog(post, index) {
                this.$store.dispatch('deletePostDialog', true)

                this.deletepost = { index: index, id: post.id }
                this.$emit('deletepost', this.deletepost)
            }
        },
        mounted() {
            console.log('blog home')
        }
    }
</script>
