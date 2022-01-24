<<<<<<< HEAD
import { connect } from 'react-redux';
import {
  getSeats,
  getRequests,
  loadSeatsRequest,
  loadSeats
} from '../../../redux/seatsRedux';
import SeatChooser from './SeatChooser';

const mapStateToProps = state => ({
  seats: getSeats(state),
  requests: getRequests(state)
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  loadSeatsData: seats => dispatch(loadSeats(seats))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatChooser);
=======
import { connect } from 'react-redux';
import {
  getSeats,
  getRequests,
  loadSeatsRequest,
  loadSeats
} from '../../../redux/seatsRedux';
import SeatChooser from './SeatChooser';

const mapStateToProps = state => ({
  seats: getSeats(state),
  requests: getRequests(state)
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  loadSeatsData: seats => dispatch(loadSeats(seats))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatChooser);
>>>>>>> 630d56bd580c4715348141ef6c1c5baf69d93ec5
