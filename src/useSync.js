import { useReducer, useEffect } from 'react'

var syncs = {}

var useSync = id => {
    var [, render] = useReducer(p => !p, false)

    useEffect(() => {
        if (!syncs[id]) syncs[id] = []
        syncs[id].push(render)

        return () => {
            var index = syncs[id].findIndex(e => e === render)
            syncs[id].splice(index, 1)
            if (syncs[id].length === 0) delete syncs[id]
        }
    }, [id])
}

var sync = id => {
    if (syncs[id]) for (let render of syncs[id]) render()
}

var storage = {}

export { useSync, sync, storage }

export default useSync