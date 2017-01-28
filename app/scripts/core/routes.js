import React from 'react'
import { Route } from 'react-router'

import Root from '../components/root'
import Error404 from '../components/error-404'


export default <Route><Route path="/" component={Root} /><Route path="*" component={Error404} /></Route>
