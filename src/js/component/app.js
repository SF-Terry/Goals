import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import targetsManagement from '../reducer'
import { logger, setStateToLocalStore, autoUpdateCurrentTime } from '../util'
import autoUpdateTargets from '../util/autoUpdateTargets/index'
import TargetsManagementContainer from '../container/index'

// global util
import $ from '../util/jquery'
window.$ = $


let store = createStore(
  targetsManagement,
  applyMiddleware(logger, setStateToLocalStore)
)

// sync store to global varible: ReduxStore
ReduxStore = store

// auto update targets
autoUpdateTargets(5000)



render(
  <Provider store={store}>
    <TargetsManagementContainer />
  </Provider>,
	document.getElementById('app')
)