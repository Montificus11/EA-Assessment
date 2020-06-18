import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Ethnicity from './Ethnicity';
import Income from './Income';
import Programs from './Programs';
import School from './School';

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        <Route path="/school" component={School} />
        <Route path="/programs" component={Programs} />
        <Route path="/ethnicity" component={Ethnicity} />
        <Route path="/income" component={Income} />
      </Switch>
    );
  }
}
