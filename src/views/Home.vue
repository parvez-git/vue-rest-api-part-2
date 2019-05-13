<template>
    <div class="home">
        <h1 class="text-sm text-center uppercase text-grey-darker">Latest Blog Post</h1>
        <div class="border-b border-gery-light w-10 mx-auto pb-8 mb-10"></div>
        <blog-create></blog-create>
        <app-blog></app-blog>
    </div>
</template>

<script>

    import Blog from '@/components/Blog.vue'
    import CreatePost from '@/components/CreatePost.vue'

    export default {
        name: 'home',
        components: {
            'app-blog': Blog,
            'blog-create': CreatePost
        }
    }
</script>
