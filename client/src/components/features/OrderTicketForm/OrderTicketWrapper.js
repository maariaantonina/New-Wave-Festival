import { useLocation } from 'react-router-dom';

import OrderTicketForm from './OrderTicketForm';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    return <Component {...props} router={{ location }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter(OrderTicketForm);
