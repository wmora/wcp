import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import registerServiceWorker from './registerServiceWorker'

const Root = () => {
    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        </div>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
