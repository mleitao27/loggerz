<template>
    <div class="bg-slate-300 min-h-screen p-6">
        <div class="flex items-center justify-between">
            <router-link to="/" class="text-xl font-semibold hover:underline">&larr; Back</router-link>
            <div class="flex">
                <div class="text-xl hover:underline mr-6 cursor-pointer" @click="previous">&larr; Previous</div>
                <div class="text-xl hover:underline cursor-pointer" @click="next">Next &rarr;</div>
            </div>
        </div>
        <div v-if="log" class="mt-4">
            <div class="flex items-center mb-4">
                <p class="text-lg mr-4">Level:</p>
                <div
                    :class="{
                        'bg-red-400': log.level === 'error',
                        'bg-slate-400': log.level === 'debug',
                        'bg-blue-400': log.level === 'info',
                        'bg-yellow-400': log.level === 'warning',
                        'bg-green-400': log.level === 'notice',
                        'bg-zinc-950 text-white': log.level === 'critical',
                        'bg-orange-400': log.level === 'alert',
                        'bg-purple-400': log.level === 'emergency',
                    }"
                    class="w-max px-2 py-1 rounded"
                >
                    {{log.level}}
                </div>
            </div>
            <div class="flex items-center mb-4">
                <p class="text-lg mr-4">Component:</p>
                <div>
                    {{log.component}}
                </div>
            </div>
            <div class="flex items-center mb-4">
                <p class="text-lg mr-4">Created at:</p>
                <div>
                    {{log.created_at}}
                </div>
            </div>

            <div>
                <p class="text-lg mr-4 mb-2">Message:</p>
                <div class="w-full bg-slate-100 p-2 rounded">
                    {{log.message}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRoute, useRouter } from 'vue-router'
    import { onMounted, computed } from 'vue'
    import { useStore } from 'vuex'
    export default {
        setup() {
            const route = useRoute()
            const router = useRouter()
            const store = useStore()
            
            onMounted(async () => {
                await store.dispatch('fetchLog', route.params.id)
            })

            const log = computed(() => {
                return store.state.logs.log
            })

            const next = async () => {
                await store.dispatch('fetchNextLog', route.params.id)
                router.replace(log.value._id, {silent:true})
            }

            const previous = async () => {
                await store.dispatch('fetchPreviousLog', route.params.id)
                router.replace(log.value._id, {silent:true})
            }

            return {
                log,
                next,
                previous
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>