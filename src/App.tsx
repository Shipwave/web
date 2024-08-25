import { Component } from 'solid-js';
import Navbar from './components/Navbar';
import Content from './components/Content';

const App: Component = () => {

  return (
    <>
      <Navbar />
      <Content />
    </>
  );
};

export default App;