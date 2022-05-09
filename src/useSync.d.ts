/**
 * A hook used within React components to subscribe to a specific sync with the given ID,
 * and to access the sync value
 * @param id The sync ID to subscribe to
 * @param initialValue An initial value returned by the hook when the sync value is not available
 * @returns The sync value
 */
declare function useSync (id: string, initialValue?: any): any
/**
 * A function can be used everywhere to dispatch a sync with the given ID,
 * and to pass a new sync value to the subscribed components
 * @param id The sync ID to synchronize
 * @param initialValue A new sync value to pass
 */
declare function sync (id: string, newValue?: any): void
/**
 * An optional object to store states inside
 */
declare const storage: { [key: string]: any }

export { useSync, sync, storage }
export default useSync
