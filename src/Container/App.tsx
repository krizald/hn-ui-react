import React from 'react';
import './App.css';
import UnstyledTopStoryGrid from '../components/TopStoryGrid';
import StoryStore from '../stores/storyStore';

function App(): React.ReactNode {
  return (
    <div>
      <UnstyledTopStoryGrid StoryDataStore={StoryStore.GetInstance()} />
    </div>
  );
}

export default App;
