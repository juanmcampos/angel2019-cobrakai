import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Router, Stack, Scene, Drawer, Modal, ActionConst } from 'react-native-router-flux';
import { View } from 'react-native';

import * as Progress from 'react-native-progress';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import CashScreen from '../screens/CashScreen';

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
                initial={!commonStore.token}
                key="Start"
                title="Start"
              />

              <Scene
                component={LinksScreen}
                hideNavBar={true}
                initial={commonStore.token}
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
