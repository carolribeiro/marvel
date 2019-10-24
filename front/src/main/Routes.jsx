import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../main/Home';
import Comics from '../comics/Comics';
import Characters from '../characters/Characters';
//import Char from '../characters/Char';

export default props => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/characters" component={Characters}/>
        <Route path="/comics" component={Comics}/>
        <Redirect from='*' to='/' />
    </Switch>
)
