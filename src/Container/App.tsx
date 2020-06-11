import React from 'react';
import './App.css';
import UnstyledTopStoryGrid from '../components/TopStoryGrid';

function App(): React.ReactNode {
  return (
    <div>
      <h2 data-testid="app_top_label">Learn React</h2>
      <UnstyledTopStoryGrid />
    </div>
  );
}

export default App;
