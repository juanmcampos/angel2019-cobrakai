import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Router, Stack, Scene, Drawer, Modal, ActionConst } from 'react-native-router-flux';
import { View } from 'react-native';

import * as Progress from 'react-native-progress';

import CashScreen from '../screens/CashScreen';
import LoginScreen from '../screens/LoginScreen';

@inject('commonStore')
@observer
export default class MainContainer extends Component {

  componentDidMount() {
    this.props.commonStore.setAppLoaded();
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      const { commonStore } = this.props;
      console.log('has', commonStore.token);
      return (
        <Router>
          <Scene key="modal" component={Modal} hideNavBar={true}>
            <Stack key="root">
              <Scene
                component={CashScreen}
                hideNavBar={true}
                initial={commonStore.token}
                key="Cash"
                title="Cash"
              />

              <Scene
                component={LoginScreen}
                hideNavBar={true}
                initial={!commonStore.token}
                key="Home"
                title="Home"
              />

            </Stack>
            {/*<Scene key="checkImageModal" component={CheckImageModal} />*/}
          </Scene>
        </Router>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Progress.Bar color={'#e97705'} indeterminate={true} width={200} />
        </View>
      );
    }
  }
}
