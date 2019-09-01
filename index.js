/* @flow */
export type { Browser } from './interface/browser'
export type { Tab } from './interface/tab'
export type { Element } from './interface/element'

export { default as openBrowser } from './actions/open-browser'
export { default as closeBrowser } from './actions/close-browser'

export { default as getTabs } from './actions/get-tabs'
export { default as openTab } from './actions/open-tab'
export { default as closeTab } from './actions/close-tab'
export { default as resizeTab } from './actions/resize-tab'
export { default as navigate } from './actions/navigate'
export { default as waitForNavigation } from './actions/wait-for-navigation'
export { default as evalInTab } from './actions/eval-in-tab'

export { default as findElement } from './actions/find-element'

export { default as clickElement } from './actions/click-element'
export { default as fillInElement } from './actions/fill-in-element'
export { default as selectFiles } from './actions/select-files'
