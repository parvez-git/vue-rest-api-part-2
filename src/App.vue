<template>
  <div id="app" class="font-sans">
    <div class="bg-red">
        <div class="container max-w-full sm:max-w-xl mx-auto text-white">
            <div class="flex items-center justify-between px-6 sm:px-0 py-6">
                <div>
                    <router-link to="/" tag="div" class="flex items-center cursor-pointer">
                        <img class="h-6 w-6 mr-2" alt="Vue logo" src="./assets/logo.png">
                        <h1 class="uppercase text-2xl">Vue Blog</h1>
                    </router-link>
                </div>
                <div id="nav" class="flex items-center">
                    <router-link to="/" class="text-white u px-2 no-underline font-semibold text-sm uppercase">Home</router-link>
                    <router-link to="/about" class="text-white u px-2 no-underline font-semibold text-sm uppercase">About</router-link>
                </div>
            </div>
            <div class="flex flex-wrap items-center max-w-md mx-auto text-center text-white h-104">
                <h1 class="px-6 sm:px-0">A beautiful, clean and simple minimalist blog with no images required</h1>
                <div class="mx-auto mb:20 sm:mb-32">
                    <button type="button" class="px-6 py-3 mx-2 bg-white border border-white text-red uppercase text-sm font-semibold focus:outline-none">Latest Posts</button>
                    <button @click="openCreatePostDialog" type="button" class="px-6 py-3 mx-2 bg-transparent border border-white text-white uppercase text-sm font-semibold focus:outline-none">Create Post</button>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-white container max-w-full sm:max-w-xl mx-auto shadow-md px-6 sm:px-32 py-10 sm:py-16 -mt-0 sm:-mt-16">
        <router-view/>
    </div>
  </div>
</template>

<script>
    export default {
        methods: {
            openCreatePostDialog() {
               this.$store.dispatch('createPostDialog', true)
            }
        },
        created() {
            this.$store.dispatch('postList')
            this.$store.dispatch('categoryList')
            this.$store.dispatch('tagList')
        }
    }
</script>

<style lang="scss">
    @tailwind preflight;
    @tailwind components;
    @tailwind utilities;
</style>
