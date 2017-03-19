import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import targetsManagement from '../reducer'
import { logger, setStateToLocalStore } from '../util'
import TargetsManagementContainer from '../container/index'


let store = createStore(
  targetsManagement,
  applyMiddleware(logger, setStateToLocalStore)
)

// sync store to global varible: ReduxStore
ReduxStore = store





render(
  <Provider store={store}>
    <TargetsManagementContainer />
  </Provider>,
	document.getElementById('app')
)