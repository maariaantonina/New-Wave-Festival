<<<<<<< HEAD
import { connect } from 'react-redux';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';
import Lineup from './Lineup';

const mapStateToProps = state => ({
  concerts: getConcerts(state),
  request: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
  loadConcerts: () => dispatch(loadConcertsRequest()),
});

=======
import { connect } from 'react-redux';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';
import Lineup from './Lineup';

const mapStateToProps = state => ({
  concerts: getConcerts(state),
  request: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
  loadConcerts: () => dispatch(loadConcertsRequest()),
});

>>>>>>> 630d56bd580c4715348141ef6c1c5baf69d93ec5
export default connect(mapStateToProps, mapDispatchToProps)(Lineup);