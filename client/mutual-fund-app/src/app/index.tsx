import React from 'react';
import { registerRootComponent } from 'expo'; 
import App from '../App';
const Root: React.FC = () => {
  return <App />;
};
registerRootComponent(Root);

export default Root;
