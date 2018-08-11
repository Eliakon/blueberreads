import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Post from './Post'
import CreatePost from './CreatePost'
import { me } from './API'

class App extends React.Component {
  state = {
    user: {}
  }

  componentWillMount = () => {
    const isLocal = window.location.origin.startsWith('http://localhost')
    if (isLocal) {
      return this.setState({
        user: {
          username: 'localuser',
          is_superuser: true
        }
      })
    }

    me((error, response) => response && this.setState({ user: response.user }))
  }

  render = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/page/:page" component={Home} />
        <Route path="/post/:id-:slug" component={Post} />
        <Route path="/post/:id" component={Post} />
        {this.state.user.is_superuser && (
          <Route path="/create-post" component={CreatePost} />
        )}
      </Switch>
    </Router>
  )
}

export default App
