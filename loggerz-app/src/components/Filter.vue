<template>
    <div class="flex">
        <img
            class="w-4 h-4 hover:underline cursor-pointer"
            @click="openFilterOptions"
            src="../assets/filter.svg"
            alt="filter"
        >
        <div class="relative ml-2">
            <div v-if="showDrawer" class="absolute bg-slate-100 rounded p-2 shadow-xl border border-slate-200 w-max">
                <div 
                    v-for="(option, index) in options"
                    :key="index"
                    class="flex items-center cursor-pointer hover:underline"
                    @click="select(option)"
                >
                    <img
                        v-if="filters.includes(option)"
                        class="w-4 h-4 mr-1"
                        src="../assets/checkbox.svg"
                        alt="box"
                    >
                    <img
                        v-else
                        class="w-4 h-4 mr-1"
                        src="../assets/box.svg"
                        alt="box"
                    >
                    <p>
                        {{ option }}
                    </p>
                </div>
                <div
                    class="
                        px-2
                        py-1
                        bg-slate-500
                        rounded-lg
                        text-white
                        text-center
                        text-sm w-max
                        ml-auto
                        mt-4
                        cursor-pointer
                        transform
                        hover:translate-x-px
                        hover:-translate-y-px
                    "
                    @click="applyFilters"
                >
                    Apply
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useStore } from 'vuex'
    import { computed, ref } from 'vue'

    export default {
        props: {
            type: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            const store = useStore()
            const showDrawer = ref(false)

            const options = computed(() => {
                return store.state.logs.filterOptions[props.type]
            })

            const filters = computed(() => {
                return store.state.logs.filters && store.state.logs.filters[props.type] ? store.state.logs.filters[props.type] : []
            })

            const openFilterOptions = async () => {
                if(!showDrawer.value) 
                    await store.dispatch('fetchFilterOptions', props.type)
                showDrawer.value = !showDrawer.value
            }

            const select = async (option) => {
                await store.dispatch('setFilters', {type: props.type, option})
            }

            const applyFilters = async () => {
                await store.dispatch('fetchLogs')
                showDrawer.value = false
            }

            return {
                openFilterOptions,
                options,
                showDrawer,
                select,
                filters,
                applyFilters
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>