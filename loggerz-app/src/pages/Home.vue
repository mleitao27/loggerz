<template>
    <div class="p-6">
        <div class="grid grid-cols-4 gap-4 bg-yellow-400 p-2 rounded">
            <p>Level</p>
            <p>Message</p>
            <p>Component</p>
            <p>Created at</p>
        </div>
        <div v-for="(log, index) in logs" :key="log._id" :class="index % 2 != 0 ? 'bg-yellow-50' : 'bg-yellow-200'" class="p-2 rounded col-span-4 grid grid-cols-4 gap-4">
            <p>{{log.level}}</p>
            <p>{{log.message}}</p>
            <p>{{log.component}}</p>
            <p>{{log.created_at}}</p>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()

        onMounted(async () => {
            console.log('here1')
            await store.dispatch('fetchLogs')
        })

        const logs = computed(() => {
            return store.state.logs.logs
        })

        return {
            logs
        }
    }
}
</script>

<style lang="scss" scoped>

</style>