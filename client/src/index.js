import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LogIn from './pages/LogIn'
import registerServiceWorker from './registerServiceWorker'

const Root = () => {
  return (
    <div className="container">
      <Router>
        <Route path="/" component={LogIn} />
      </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
