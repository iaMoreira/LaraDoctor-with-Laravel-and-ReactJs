import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './pages/Main.js'
import Header from './pages/Header.js'
import Form from './pages/Form.js'
import Show from './pages/Show.js'

export default function Routes() {
    return (
        <BrowserRouter>
            <Header />
            <Route path="/" exact component={Main} />
            <Route path="/create" exact component={Form} />
            <Route path="/edit/:id" exact component={Form} />
            <Route path="/show/:id" exact component={Show} />
        </BrowserRouter>
    )
}
