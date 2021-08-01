import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Index from './Index'
import Created from './Create'
import Show from './Show'
import Edit from './Edit'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Index} />
                        <Route exact path='/create' component={Created} />
                        <Route path='/users/edit/:id' component={Show} />
                        <Route path='/users/:id' component={Edit} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
export default App