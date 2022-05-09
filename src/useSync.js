import { useReducer, useEffect, useRef } from 'react'


const syncs = {}

const useSync = (id, initialValue) => {
  const [, dispatch] = useReducer(state => !state, false)
  const value = useRef(initialValue)
  const render = (newValue) => {
    value.current = newValue
    dispatch()
  }

  useEffect(() => {
    if (!syncs[id]) syncs[id] = []
    syncs[id].push(render)

    return () => {
      const index = syncs[id].findIndex(r => r === render)
      syncs[id].splice(index, 1)
      if (syncs[id].length === 0) delete syncs[id]
    }
  }, [id])

  return value.current
}

const sync = (...args) => {
  const [id, newValue] = args

  if (!syncs[id]) return
  for (const render of syncs[id]) {
    setTimeout(() => args.length < 2 ? render() : render(newValue), 0)
  }
}

const storage = {}

export { useSync, sync, storage }
export default useSync
