import React from 'react';
import Loader from '../Loader';

export default loader => (
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.Component = null;
      this.state = { Component: AsyncComponent.Component };
    }

    componentDidMount() {
      if (!this.state.Component) {
        loader().then((Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      if (this.state.Component) {
        return (
          <this.state.Component {...this.props} />
        );
      }

      return <Loader />;
    }
  }
);
