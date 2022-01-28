import React from 'react';
import { Link } from 'react-router-dom';

import {
  Alert,
  Container,
  Progress,
  List,
  ListInlineItem,
  Row,
  Col,
  Button,
} from 'reactstrap';

import './PricesPage.scss';

class Prices extends React.Component {
  componentDidMount() {
    const { loadConcerts } = this.props;
    loadConcerts();
  }
  render() {
    const { request, concerts } = this.props;

    if (request.pending)
      return <Progress animated color='primary' value={50} />;
    else if (request.error)
      return <Alert color='warning'>{request.error}</Alert>;
    else if (!request.success || !concerts.length)
      return <Alert color='info'>No concerts</Alert>;
    else if (request.success)
      return (
        <Container>
          <Row className='prices__info'>
            <Col xs='12' md='6'>
              <h1>Prices</h1>
              <p>Prices may differ according the day of the festival.</p>
              <p>
                Remember that ticket includes not only the star performance, but
                also 10+ workshops. We gathered several genre teachers to help
                you increase your vocal skills, as well as self confidence.
              </p>
              <Alert color='info'>
                Attention!{' '}
                <strong>
                  Children under 4 can go freely with you without any other fee!
                </strong>
              </Alert>
            </Col>
            <Col
              md='6'
              className='d-none d-md-flex prices__info__image-container'
            >
              <img
                className='prices__info__image-container__img'
                src='/img/promo/promo1.jpg'
                alt='Have fun with thousands of people!'
              ></img>
            </Col>
          </Row>

          <Row className='concerts__info'>
            <Col xs='12' sm='4'>
              <div className='concerts__info__image-container'>
                <img
                  className='concerts__info__image-container__img'
                  src='/img/promo/promo2.jpg'
                  alt='Have fun with thousands of people!'
                ></img>
              </div>
            </Col>
            <Col sm='7' md='6'>
              {concerts
                .sort((a, b) => a.day - b.day)
                .map((concert) => (
                  <div key={concert._id} className='concerts__info'>
                    <span className='concerts__info__day'>
                      Day {concert.day}
                    </span>
                    <h3 className='concerts__info__artist'>
                      {concert.performer}
                    </h3>

                    <Row>
                      <Col>
                        <span className='concerts__info__price'>
                          {concert.price}
                        </span>
                        <span> - General Admission</span>
                      </Col>
                      <Col>
                        <Link
                          to={{
                            pathname: '/order-a-ticket',
                          }}
                          state={{ day: concert.day }}
                        >
                          <Button color='primary' outline size='sm'>
                            Buy now
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                    <div>
                      <span className='workshops__info'>Workshops:</span>
                      <List type='inline' className='workshops__list'>
                        {concert.workshops.map((workshop) => (
                          <ListInlineItem
                            key={workshop._id}
                            className='workshops__list__item'
                          >
                            {workshop.name}
                          </ListInlineItem>
                        ))}
                      </List>
                    </div>
                  </div>
                ))}
            </Col>
          </Row>
        </Container>
      );
  }
}

export default Prices;
