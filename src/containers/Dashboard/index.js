import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Redirect, Link } from 'react-router-dom';

import RouteWithSubRoutes from '../../components/RouteWithSubRoutes';
import { routes } from './routes';

@connect()
export default class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Switch>
          {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
          <Redirect from="*" to="/not-found" />
        </Switch>
      </div>
    );
  }
}
