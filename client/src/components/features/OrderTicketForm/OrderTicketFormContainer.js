import { connect } from 'react-redux';
import {
  addSeatRequest,
  getRequests,
  loadSeatsRequest,
} from '../../../redux/seatsRedux';
import OrderTicketFormWrapper from './OrderTicketWrapper';

const mapStateToProps = (state) => ({
  requests: getRequests(state),
});

const mapDispatchToProps = (dispatch) => ({
  addSeat: (seat) => dispatch(addSeatRequest(seat)),
  loadSeats: () => dispatch(loadSeatsRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTicketFormWrapper);
