import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Comics from '../main/Home'
import Comics from '../comics/Comics'

export default props => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/comics" component={Comics}/>
        <Redirect from='*' to='/' />
    </Switch>
)
