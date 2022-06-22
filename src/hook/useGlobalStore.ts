import { inject } from "vue"

const STOREKEY = Symbol('STOREKEY')

function useGlobalStore() {
    return inject(STOREKEY)
}

export { useGlobalStore , STOREKEY }


