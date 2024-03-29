import React from 'react';
import { Button, Progress, Alert } from 'reactstrap';
import io from 'socket.io-client';

import './SeatChooser.scss';

class SeatChooser extends React.Component {
  componentDidMount() {
    const { loadSeats, loadSeatsData } = this.props;
    console.log('loading');
    this.socket = io(
      process.env.NODE_ENV === 'production' ? '' : 'localhost:8000'
    );
    this.socket.on('seatsUpdated', (seats) => {
      loadSeatsData(seats);
    });
    loadSeats();
  }

  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;

    return seats.some((item) => item.seat === seatId && item.day === chosenDay);
  };

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if (seatId === chosenSeat)
      return (
        <Button key={seatId} className='seats__seat' color='primary'>
          {seatId}
        </Button>
      );
    else if (isTaken(seatId))
      return (
        <Button key={seatId} className='seats__seat' disabled color='secondary'>
          {seatId}
        </Button>
      );
    else
      return (
        <Button
          key={seatId}
          color='primary'
          className='seats__seat'
          outline
          onClick={(e) => updateSeat(e, seatId)}
        >
          {seatId}
        </Button>
      );
  };

  render() {
    const { prepareSeat } = this;
    const { requests, seats, chosenDay } = this.props;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id='pickHelp' className='form-text text-muted small'>
          <Button color='secondary' /> – seat is already taken
        </small>
        <small id='pickHelpTwo' className='form-text text-muted small'>
          <Button outline color='primary' /> – it's empty
        </small>
        {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success && (
          <div className='seats'>
            {[...Array(50)].map((x, i) => prepareSeat(i + 1))}
          </div>
        )}
        {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending && (
          <Progress animated color='primary' value={50} />
        )}
        {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error && (
          <Alert color='warning'>Couldn't load seats...</Alert>
        )}
        <h3>
          Free Seats:
          {50 - seats.filter((client) => client.day === chosenDay).length}/50
        </h3>
      </div>
    );
  }
}

export default SeatChooser;
