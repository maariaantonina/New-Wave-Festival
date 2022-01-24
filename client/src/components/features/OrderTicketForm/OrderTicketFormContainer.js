<<<<<<< HEAD
import { connect } from 'react-redux';
import {
  addSeatRequest,
  getRequests,
  loadSeatsRequest
} from '../../../redux/seatsRedux';
import OrderTicketForm from './OrderTicketForm';

const mapStateToProps = state => ({
  requests: getRequests(state)
});

const mapDispatchToProps = dispatch => ({
  addSeat: seat => dispatch(addSeatRequest(seat)),
  loadSeats: () => dispatch(loadSeatsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTicketForm);
=======
import { connect } from 'react-redux';
import {
  addSeatRequest,
  getRequests,
  loadSeatsRequest
} from '../../../redux/seatsRedux';
import OrderTicketForm from './OrderTicketForm';

const mapStateToProps = state => ({
  requests: getRequests(state)
});

const mapDispatchToProps = dispatch => ({
  addSeat: seat => dispatch(addSeatRequest(seat)),
  loadSeats: () => dispatch(loadSeatsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTicketForm);
>>>>>>> 630d56bd580c4715348141ef6c1c5baf69d93ec5
