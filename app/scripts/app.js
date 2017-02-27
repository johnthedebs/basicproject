import _ from 'underscore'

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
import './utils/underscoreMixins'


if (window.sentry_public_dsn) {
  Raven.config(window.sentry_public_dsn).install()
}

let enhancer

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunkMiddleware)
} else {
  const createLogger = require('redux-logger') // eslint-disable-line

  enhancer = compose(
        applyMiddleware(
            createLogger(),
            thunkMiddleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
    )
}

const rootReducer = combineReducers(_({}).extend(
    Reducers,
    { routing: routerReducer }
))

const store = createStore(
    rootReducer,
    {},
    enhancer
)

const history = syncHistoryWithStore(browserHistory, store)

render((
  <Provider store={store}><Router history={history}>{Routes}</Router></Provider>
), document.getElementById('content'))
