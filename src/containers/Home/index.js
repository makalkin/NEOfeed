import React, { Component } from 'react';
import {
  Badge,
  ListGroup,
  ListGroupItem,
  Row,
  Container,
  Col,
  ListGroupItemHeading,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { NeoActions } from '../../actions/neo';
import logo from './logo.svg';
import './home.css';
import { getNeoActiveDays } from '../../selectors/neo';
import { NeoService } from '../../services';

@connect(state => ({
  activeDays: getNeoActiveDays(state),
}))
class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    activeDays: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        neos: PropTypes.arrayOf(PropTypes.object),
      }),
    ),
  };

  static defaultProps = {
    activeDays: [],
  };

  constructor(props) {
    super(props);
    this.dayToFetch = moment('2017-09-01T23:59:59');

    this.neoService = new NeoService();
  }

  componentDidMount() {
    this.props.dispatch(NeoActions.startFeed(this.dayToFetch));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.activeDays) {
      this.neoService.setDays(nextProps.activeDays);
    }
  }

  render() {
    const days = this.neoService.days;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">It's a plane... It's a bird... It's a NEO!</h1>
        </header>
        <p className="App-intro">If you are reading this everything is pretty OK.</p>
        <Container>
          <ListGroup>
            {days.map(day => (
              <ListGroupItem
                key={day.day}
                color={`${this.neoService.isHazardous(day) ? 'danger' : 'default'}`}
              >
                <ListGroupItemHeading>{day.day}</ListGroupItemHeading>

                <Row>
                  <Col sm={12}>
                    Max estimated diameter:{' '}
                    <b>{NeoService.getMaxEstimatedDiameterOfTheDay(day)} </b>
                    <Badge color="primary" pill>
                      km
                    </Badge>
                  </Col>

                  <Col sm={12}>
                    Potentially hazardous NEOs:{' '}
                    <b>{NeoService.getPotentialHazardsForTheDay(day)}</b>
                  </Col>

                  <Col sm={12}>
                    Closest NEO : <b>{NeoService.closestNeoOfTheDay(day)}</b>{' '}
                    <Badge color="primary" pill>
                      km
                    </Badge>
                  </Col>

                  <Col sm={12}>
                    Fastest NEO : <b>{NeoService.fastestNeoOfTheDay(day)} </b>
                    <Badge color="primary" pill>
                      km/h
                    </Badge>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Container>
      </div>
    );
  }
}

export default withRouter(Home);
