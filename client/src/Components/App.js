import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NotFound } from './Errors';

import Layout from './Layout';
import Photos from './Photos';
export default class extends Component {
  state={
    users: []
  }

  async componentDidMount() {
    const users = await (await fetch('http://localhost:3004/users?_embed=texts')).json()
    this.setState({ users })
  }

  render(){

    const { users } = this.state


    return <BrowserRouter>
      <Layout users={users}>
        <Switch>
          <Route path="/albums/:albumId" component={Photos}/>
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  }
    
}

