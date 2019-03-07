import React, {useEffect} from 'react';
import * as firebaseui from 'firebaseui'
import { uiConfig, firebaseAuth } from '../../config/firebase';
import { Title } from 'bloomer';

const Home = () => {

  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth());
    ui.start('#firebaseui-auth-container', uiConfig);
  })

  return (
    <>
      <Title isSize={1}>Login</Title>
      <div id="firebaseui-auth-container"></div>
    </>
  );
}

export default Home;