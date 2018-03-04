import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import registerServiceWorker from './registerServiceWorker'

const Root = () => {
    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={LogIn} />
                    <Route exact path="/signup" component={SignUp} />
                </Switch>
            </Router>
        </div>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
