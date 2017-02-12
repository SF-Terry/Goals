import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import targetsManagement from '../reducer'
import { logger, setStateToLocalStore } from '../util'

import TargetsManagement from './TargetsManagement'

let store = createStore(
  targetsManagement,
  applyMiddleware(logger, setStateToLocalStore)
)

render(
  <Provider store={store}>
    <TargetsManagement />
  </Provider>,
	document.getElementById('app')
)