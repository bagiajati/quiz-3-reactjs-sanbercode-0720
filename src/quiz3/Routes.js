import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../quiz3/Index'
import About from '../quiz3/About'
import MovieListEditor from '../quiz3/MovieListEditor'
import Nav from '../quiz3/Nav'

const Routes = () => {
    return (
        <>
            <Nav/>
            <Switch>
                <Route exact path="/"> < Home /> </Route>
                <Route path="/about"> < About /> </Route>
                <Route path="/mle"> < MovieListEditor /> </Route>
                {/* <Route path="/tugas13"> <Tugas13 /> </Route>
                <Route path="/tugas14"> <Tugas14 /> </Route>
                <Route path="/tugas15"> <Tugas15 /> </Route> */}
            </Switch>
        </>
    )
}

export default Routes;