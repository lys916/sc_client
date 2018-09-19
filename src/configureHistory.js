import { createBrowserHistory, createHashHistory } from 'history'

const configureHistory = ()=>{
  return window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
    : createBrowserHistory()
}

export default configureHistory;