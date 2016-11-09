import _ from 'underscore'
import './utils/underscoreMixins'

import Raven from 'raven-js'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { browserHistory, Router } from 'react-router'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'

import Reducers from './core/reducers'
import Routes from './core/routes'


if (window.sentry_public_dsn) {
  Raven.config(window.sentry_public_dsn).install()
}

if (process.env.NODE_ENV === 'production') {
  var enhancer = applyMiddleware(thunkMiddleware)
} else {
  const createLogger = require('redux-logger')
  const DevTools = require('./utils/devtools')

  var enhancer = compose(
        applyMiddleware(
            createLogger(),
            thunkMiddleware
        ),
        DevTools.instrument()
    )
}

const rootReducer = combineReducers(_({}).extend(
    Reducers,
    { routing: routerReducer }
)
)

const store = createStore(
    rootReducer,
    {},
    enhancer
)

const history = syncHistoryWithStore(browserHistory, store)

render((
  <Provider store={store}><Router history={history}>{Routes}</Router></Provider>
), document.getElementById('content'))
