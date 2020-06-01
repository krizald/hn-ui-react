import React from 'react';
import './App.css';
import UnstyledTopStoryGrid from '../components/TopStoryGrid';
import StoryStore from '../stores/storyStore';

function App(): React.ReactNode {
  return (
    <div>
      <h2 data-testid="app_top_label">Learn React</h2>
      <UnstyledTopStoryGrid StoryDataStore={StoryStore.GetInstance()} />
    </div>
  );
}

export default App;
