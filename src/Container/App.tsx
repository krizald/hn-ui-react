import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TopStories from './TopStories';
import ItemDetail from './ItemDetail';
/* App component */
function App(): React.ReactNode {
  return (
    <Switch>
      <div>
        <h2 data-testid="app_top_label">Learn React</h2>
        <Route exact path="/" component={TopStories} />
        <Route path="/item/:id" component={ItemDetail} />
      </div>
    </Switch>
  );
}

export default App;
