import React from 'react';
import ImageList from './ImageList';

const data = [
  'https://images.unsplash.com/photo-1682695796795-cc287af78a2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3570&q=80',
  'https://i.pinimg.com/originals/4b/3e/c3/4b3ec3b980f3a82eb6b754d4149138c4.jpg',
  'https://images.unsplash.com/photo-1682687982107-14492010e05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3687&q=80',
  'https://plus.unsplash.com/premium_photo-1679757670562-0e00c3863bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3687&q=80',
  'https://images.unsplash.com/photo-1693851505426-c183d5f7d2c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3570&q=80',
  'https://images.unsplash.com/photo-1682685797208-c741d58c2eff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3570&q=80',
  'https://i.pinimg.com/originals/dc/e4/24/dce42482d815bfbc30e5f09a239371b8.jpg',
];

const App = () => {
  return <ImageList sources={data} />;
};

export default App;
