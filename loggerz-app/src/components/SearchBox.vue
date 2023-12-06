<template>
    <div class="mb-4">
        <form  @submit.prevent="setSearch">
            <input
                class="p-1 rounded"
                type="text"
                name="search" 
                id="searchbox"
                placeholder="Search"
                v-model="text"
            >
        </form>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useStore } from 'vuex'

    export default {
        setup() {
            const text = ref('')
            const store = useStore()

            const setSearch = async () => {
                await store.dispatch('setSearch', text.value)
                await store.dispatch('fetchLogs')
            }

            return {
                text,
                setSearch
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>