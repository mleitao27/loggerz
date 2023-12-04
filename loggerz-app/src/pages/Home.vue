<template>
    <div class="bg-slate-300 min-h-screen p-6">
        <div v-if="logs">
            <div class="grid grid-cols-4 gap-4 bg-slate-500 p-2 rounded-t">
                <div class="flex items-center"><p class="mr-2">Level</p><Filter type="level"/></div>
                <p>Message</p>
                <div class="flex items-center"><p class="mr-2">Component</p><Filter type="component"/></div>
                <p>Created at</p>
            </div>
            <router-link 
                v-for="(log, index) in logs" 
                :key="log._id" 
                :class="[index % 2 != 0 ? 'bg-slate-50' : 'bg-slate-100', {'rounded-b' : index === logs.length-1}]"
                class="p-2 grid grid-cols-4 gap-4"
                :to="'/log/' + log._id"
            >
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
                    <div>{{log.message}}</div>
                    <div>{{log.component}}</div>
                    <div>{{log.created_at}}</div>
            </router-link>
            <div class="w-full grid grid-cols-12 mt-4">
                <p class="text-lg col-span-9">{{'Displayed records: ' + page * logsPerPage + '-' + lastLog + ' of ' + totalLogCount}}</p>
                <p v-if="page > 0" class="text-lg hover:underline cursor-pointer" @click="previousPage">&larr; Previous</p>
                <div v-else/>
                <p class="text-lg px-4">{{page + 1}}</p>
                <p v-if="hasNextPage" class="text-lg hover:underline cursor-pointer" @click="nextPage">Next &rarr;</p>
                <div v-else/>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Filter from '../components/Filter.vue'

export default {
    components: {
        Filter
    },
    setup() {
        const store = useStore()

        onMounted(async () => {
            await store.dispatch('fetchLogs')
        })

        const logs = computed(() => {
            return store.state.logs.logs
        })

        const page = computed(() => {
            return store.state.nav.page
        })

        const logsPerPage = computed(() => {
            return store.state.nav.logsPerPage
        })

        const lastLog = computed(() => {
            return page.value * logsPerPage.value + logsPerPage.value
        })

        const hasNextPage = computed(() => {
            return store.state.nav.hasNextPage
        })

        const totalLogCount = computed(() => {
            return store.state.nav.totalLogCount
        })

        const nextPage = async () => {
            await store.dispatch('goToNextPage')
            await store.dispatch('fetchLogs')
        }

        const previousPage = async () => {
            await store.dispatch('goToPreviousPage')
            await store.dispatch('fetchLogs')
        }

        return {
            logs,
            page,
            nextPage,
            previousPage,
            hasNextPage,
            totalLogCount,
            logsPerPage,
            lastLog
        }
    }
}
</script>

<style lang="scss" scoped>

</style>