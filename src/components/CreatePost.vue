<template>
    <div v-show="createpostdialog" class="createblog fixed pin-x pin-y w-full h-full overflow-auto z-50">
        <div class="bg-white p-8 sm:p-20 w-80 sm:w-160 mx-auto my-10 sm:my-20 shadow-lg rounded relative">
            <span @click="close" class="absolute pin-r pin-t h-6 w-6 mt-4 mr-4 block bg-red rounded-full text-center text-white text-xl font-bold float-right cursor-pointer select-none shadow">&times;</span>
            <h2 class="mb-4">Create New Post</h2>
            <form @submit.prevent="onCreatePost">
                <input type="text" v-model="title" class="p-2 mb-2 w-full border border-grey focus:outline-none" placeholder="Title">
                <div>
                    <select v-model="categoryid" class="p-2 mb-2 w-full bg-white text-grey-darkest border border-grey focus:outline-none">
                        <option disabled value="">--SELECT CATEGORY--</option>
                        <option 
                            v-for="category in categories" 
                            :key="category.id" 
                            :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>    
                <div v-for="tag in tags" :key="tag.id" class="flex items-center inline-flex my-4 mr-4">
                    <input :value="tag.id" v-model="tagids" type="checkbox" :id="`tag-${tag.id}`">
                    <label :for="`tag-${tag.id}`" class="text-grey-darkest ml-2">{{ tag.name }}</label>
                </div>
                <textarea v-model="description" class="p-2 mb-2 w-full border border-grey focus:outline-none" rows="5" placeholder="Description"></textarea>
                <button :disabled="!isValid" :class="{'cursor-not-allowed':!isValid}" type="submit" class="px-4 py-3 w-full bg-white hover:bg-green-dark border border-green text-green hover:text-white uppercase text-xs font-semibold focus:outline-none">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'createblog',
        data() {
            return {
                title: '',
                description: '',
                categoryid: '',
                tagids: []
            }
        },
        computed: {
            ...mapGetters({
                categories: 'getcategoryList',
                tags: 'getTagList'
            }),
            isValid() {
                return this.title !== '' && this.description !== '' && this.categoryid
            },
            createpostdialog() {
                return this.$store.getters.getCreatePostDialog
            }
        },
        methods: {
            onCreatePost() {
                this.$store.dispatch('createPost', {
                    title: this.title,
                    description: this.description,
                    categoryid: this.categoryid,
                    tagids: this.tagids
                })
            },
            close() {
                this.$store.dispatch('createPostDialog', false)
            }
        },
        mounted() {
            console.log('create post')
        }
    }
</script>

<style lang="scss" scoped>
    .createblog {
        background-color: rgba(0, 0, 0, 0.4);
    }
</style>

