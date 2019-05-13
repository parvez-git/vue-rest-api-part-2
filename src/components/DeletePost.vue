<template>
    <div class="deletepost fixed pin-x pin-y w-full h-full overflow-auto z-50">
        <div class="bg-red p-8 w-80 mx-auto my-20 text-white text-center shadow-lg rounded">
            <form @submit.prevent="onDeletePost">
                <h2>Are you sure you want to delete the post?</h2>
                <div class="my-12">
                    <svg class="w-32 h-32 border-4 border-white rounded-full p-6 feather feather-trash-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </div>
                <div class="flex items-center">
                    <button @click="close" type="button" class="px-4 py-3 mr-2 w-full bg-white hover:bg-grey-darkest text-grey-darkest hover:text-white uppercase text-xs font-semibold focus:outline-none">Close</button>
                    <button type="submit" class="px-4 py-3 ml-2 w-full bg-white hover:bg-green-dark text-red hover:text-white uppercase text-xs font-semibold focus:outline-none">Delete</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'deletepost',
        props: {
            deletepost: {
                type: Object,
                required: true
            }
        },
        methods: {
            onDeletePost() {
                this.$store.dispatch('deletePost', {
                    index: this.deletepost.index,
                    id: this.deletepost.id
                })
            },
            close() {
                this.$store.dispatch('deletePostDialog', false)
            }
        }
    }
</script>
