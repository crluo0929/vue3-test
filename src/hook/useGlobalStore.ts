import { inject } from "vue"

const STOREKEY = Symbol('STOREKEY')

function useGlobalStore():any {
    return inject(STOREKEY)
}

export { useGlobalStore , STOREKEY }


