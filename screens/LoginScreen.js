import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  StyleSheet,
  Platform,
  Animated,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Button, Card, Overlay, ListItem, Input, CheckBox } from 'react-native-elements';

import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
  background: require('../assets/images/home-header.png'), // Put your own image here
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
  },
  movementsButton: {
    marginHorizontal: 10,
    marginTop: 10
  },
});

@inject('commonStore')
@observer
export default class LoginScreen extends Component {

  state = {
    exit: false,
    isVisible: false,
    numero:'',
    nip: '',
  }

  handleExitOpen = () => {
    this.setState({ exit: true })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}>Scotiabank</Text>

        <Input
          placeholder='Numero de cuenta'
          shake={true}
          keyboardType='default'
          inputContainerStyle={{height: 70, borderBottomWidth:0}}
          containerStyle={{backgroundColor:'white', width: '95%', height: 70}}
          onChangeText={(numero) => this.setState({ numero })}
          value={this.state.numero}
          returnKeyType = "next"

        />

        <Input
          placeholder='Nip'
          shake={true}
          keyboardType='default'
          inputContainerStyle={{height: 70, borderBottomWidth:0}}
          containerStyle={{backgroundColor:'white', width: '95%', height: 70}}
          onChangeText={(nip) => this.setState({ nip })}
          value={this.state.nip}
          returnKeyType = "next"
          inputRef={(input) => {
            this.passTextInput = input
        }}
          
        />
        <Button title="Acceder" type="outline" 
          buttonStyle={{ borderColor: 'white', borderWidth: 2 }}
          titleStyle={{ color: 'white' }} 
          
          buttonStyle={{ width: '98%' , height: 120, borderColor: 'white', borderWidth: 2 }}
          titleStyle={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}
          disabled={(this.state.numero === '' || this.state.nip === '')}
          onPress={() => this.props.commonStore.setToken("token")}></Button>
      </View>
    );
  }
}