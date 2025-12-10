import { loadCatalog, loadIDs } from './.wuchale/kit.proxy.sync.js'
import { currentRuntime } from 'wuchale/load-utils/server'

const key = 'kit'

export { loadCatalog, loadIDs, key } // for hooks.server.{js,ts}

// for non-reactive
export const getRuntime = (/** @type {string} */ loadID) => currentRuntime(key, loadID)

// same function, only will be inside $derived when used
export const getRuntimeRx = getRuntime
