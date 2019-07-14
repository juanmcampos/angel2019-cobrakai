import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import TouchableScale from 'react-native-touchable-scale';

import { LinearGradient } from 'expo';

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

export default class CashScreen extends Component {

  state = {
    exit: false,
    isVisible: false,
    isAddingContact: false,
    isSending: false,
    nombre: '',
    numero: '',
    added: false,
    checked: false,
    sent: false,
    otra: "",
    ultimosMovimientos: [
      { "valor": "$300.00", "concepto": "Medicina" },
      { "valor": "$150.00", "concepto": "Restaurante" },
      { "valor": "$300.00", "concepto": "Medicina" },
      { "valor": "$150.00", "concepto": "Restaurante" },
      { "valor": "$300.00", "concepto": "Medicina" },
    ],
    contactos: [
      { "nombre": `Oscar Hernandex`, "numero": `5555577777` }
    ],
    cantidades: [
      "5000",
      "2000",
      "1000",
      "500",
      "200"
    ]
  }

  handleExitOpen = () => {
    this.setState({ exit: true })
  }

  handleExitClose = () => {
    this.setState({ exit: false })
  }

  addContact = () => {
    let contactos = this.state.contactos;
    contactos.push({ "nombre": `${this.state.nombre}`, "numero": `${this.state.numero}` });
    this.setState({ contactos: contactos, nombre: '', numero: '', isAddingContact: false, added: true });
  }

  handleTransfer = () => {
    this.setState({otra: "", isSending: false, sent: true, checked: false});
  }

  sendTransferView = () => (
    <Overlay
      isVisible={this.state.isSending}
      windowBackgroundColor="rgba(0, 0, 0, .3)"
      overlayBackgroundColor="rgba(255, 255, 255, 1)"
      onBackdropPress={() => this.setState({ isSending: false })}
      height="60%"
    >
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-evenly' }} behavior="padding" enabled>
        <Text style={{ fontSize: 26, marginBottom: 10 }}>Elije una cantidad</Text>
        {(this.state.checked === false && this.state.cantidades.length > 0) &&
          this.state.cantidades.map((cantidad, index) =>
            <ListItem
              key={index}
              Component={TouchableScale}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              linearGradientProps={{
                colors: ['#69F0AE', '#00E676'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              ViewComponent={LinearGradient} // Only if no expo
              containerStyle={{ borderRadius: 5, marginBottom: 10 }}
              title={`$ ${cantidad}.00`}
              titleStyle={{ color: 'white', fontWeight: 'bold' }}
              onPress={()=> this.setState({ checked: true, otra: `${cantidad}`})}
              chevronColor="white"
              chevron
            />
          )}
        <CheckBox
          title='Otra Cantidad'
          checked={this.state.checked}
          onPress={() => this.setState({ checked: !this.state.checked })}
        />

        {this.state.checked === true && (<Input
          placeholder='Otra cantidad'
          shake={true}
          keyboardType='phone-pad'
          onChangeText={(otra) => this.setState({ otra })}
          value={this.state.otra}
        />)}

        <Button disabled={!this.state.checked} title="Enviar" icon={<Icon name="send" size={25} color="#FFF" />} buttonStyle={{ backgroundColor: 'green' }} titleStyle={{ color: '#FFF' }} type="solid" onPress={this.handleTransfer}></Button>
        <Button title="Cancelar" type="outline" buttonStyle={{ borderColor: '#FF0000', borderWidth: 1 }}
          titleStyle={{ color: '#FF0000' }} onPress={() => this.setState({ isSending: false })}></Button>
      </KeyboardAvoidingView>

    </Overlay>
  )

  addContactView = () => (
    <Overlay
      isVisible={this.state.isAddingContact}
      windowBackgroundColor="rgba(0, 0, 0, .3)"
      overlayBackgroundColor="rgba(255, 255, 255, 1)"
      onBackdropPress={() => this.setState({ isAddingContact: false })}
      height="30%"
    >
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-evenly' }} behavior="padding" enabled>
        <Text style={{ fontSize: 26, marginBottom: 10 }}>Agregar Contacto</Text>

        <Input
          placeholder='Nombre'
          shake={true}
          leftIcon={
            <Icon
              name='person'
              size={24}
              color='black'
            />
          }
          onChangeText={(nombre) => this.setState({ nombre })}
          value={this.state.nombre}
        />
        <Input
          placeholder='Numero'
          shake={true}
          keyboardType='phone-pad'
          leftIcon={
            <Icon
              name='phone'
              size={24}
              color='black'
            />
          }
          onChangeText={(numero) => this.setState({ numero })}
          value={this.state.numero}
        />
        <Button icon={<Icon name="add" size={25} color="#FFF" />} buttonStyle={{ backgroundColor: 'green' }} titleStyle={{ color: '#FFF' }} type="solid" title="Agregar" onPress={this.addContact}></Button>
        <Button title="Cancelar" type="outline" buttonStyle={{ borderColor: '#FF0000', borderWidth: 1 }}
          titleStyle={{ color: '#FF0000' }} onPress={() => this.setState({ isAddingContact: false })}></Button>
      </KeyboardAvoidingView>

    </Overlay>
  )

  renderNavBar = () => (
    <View style={styles.navContainer}>
      <SCLAlert
        theme="danger"
        show={this.state.exit}
        title="Alerta"
        subtitle="¿Estas seguro que quieres salir de tu cuenta?"
        onRequestClose={() => { }}
      >
        <SCLAlertButton theme="danger" onPress={this.handleExitClose}>SI</SCLAlertButton>
        <SCLAlertButton theme="default" onPress={this.handleExitClose}>NO</SCLAlertButton>
      </SCLAlert>
      <SCLAlert
        theme="info"
        show={this.state.added}
        title="Notificación"
        subtitle="Se agrego el contacto con exito"
        onRequestClose={() => { }}
      >
        <SCLAlertButton theme="info" onPress={() => this.setState({ added: false })}>Aceptar</SCLAlertButton>
      </SCLAlert>
      <SCLAlert
        theme="success"
        show={this.state.sent}
        title="Notificación"
        subtitle="Se envio la transferencia"
        onRequestClose={() => { }}
      >
        <SCLAlertButton theme="success" onPress={() => this.setState({ sent: false })}>Aceptar</SCLAlertButton>
      </SCLAlert>
      {this.addContactView()}
      {this.sendTransferView()}
      <Overlay
        isVisible={this.state.isVisible}
        windowBackgroundColor="rgba(0, 0, 0, .3)"
        overlayBackgroundColor="rgba(255, 255, 255, 1)"
        onBackdropPress={() => this.setState({ isVisible: false })}
        height="65%"
      >
        <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-evenly' }}>
          <Text style={{ fontSize: 26, marginBottom: 10 }}>Últimos 5 movimientos</Text>

          {this.state.ultimosMovimientos.length > 0 &&
            this.state.ultimosMovimientos.map(({ valor, concepto }, index) =>
              <ListItem
                key={index}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                linearGradientProps={{
                  colors: ['#FF9800', '#F44336'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                ViewComponent={LinearGradient} // Only if no expo
                containerStyle={{ borderRadius: 5, marginBottom: 10 }}
                title={valor}
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'white' }}
                subtitle={concepto}

                chevronColor="white"
                chevron
              />
            )}
          <Button icon={<Icon name="add" size={25} color="#FFF" />} title="Ver mas" buttonStyle={{ borderColor: '#FF0000', borderWidth: 1 }}
            titleStyle={{ color: '#FF0000' }} type="outline" onPress={() => this.setState({ isVisible: false })}></Button>
          <Button icon={<Icon name="close" size={25} color="#FFF" />} buttonStyle={{ backgroundColor: 'red' }} titleStyle={{ color: '#FFF' }} title="Cerrar" type="solid" onPress={() => this.setState({ isVisible: false })}></Button>
        </View>

      </Overlay>
      <View style={styles.statusBar} />

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={this.handleExitOpen}>
          <Icon name="close" size={40} color="#000" />
        </TouchableOpacity>

      </View>
    </View>
  )

  renderContent = () => (
    <View style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
      <Button icon={
        <Icon
          name="search"
          size={40}
          color="#FF0000"
        />
      }
        Component={TouchableScale}
        friction={90} //
        tension={100}
        activeScale={0.95} //
        title="Consultar movimientos" type="outline"
        style={styles.movementsButton}
        buttonStyle={{ height: 140, borderColor: '#FF0000', borderWidth: 2 }}
        titleStyle={{ color: '#FF0000', fontSize: 30 }}
        onPress={() => this.setState({ isVisible: true })}
      ></Button>


      <Card
        title='TRANSFERENCIAS'
      >
        <View>
          {this.state.contactos.length > 0 ?

            this.state.contactos.map(({ nombre, numero }, index) =>
              <ListItem
                key={index}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                linearGradientProps={{
                  colors: ['#FF98CC', '#F44336'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                ViewComponent={LinearGradient} // Only if no expo
                containerStyle={{ borderRadius: 5, marginBottom: 10 }}
                title={nombre}
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'white' }}
                subtitle={numero}
                leftIcon={{ name: 'person', color: 'white' }}
                onPress={() => this.setState({ isSending: true })}
                chevronColor="white"
                chevron
              />)
            :
            <Text style={{ marginBottom: 10, fontSize: 30, textAlign: 'center' }}>
              No hay contactos para transferencias.
    </Text>
          }

          <Button
            icon={<Icon name='add' color='#ffffff' />}
            onPress={() => this.setState({ isAddingContact: true })}
            buttonStyle={{ backgroundColor: 'red', borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='AGREGAR UN CONTACTO' />
        </View>
      </Card>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={250}
          extraScrollHeight={20}
          navbarColor="#FF0000"
          title="$ 100, 000. 00"
          titleStyle={styles.titleStyle}
          backgroundImage={images.background}
          backgroundImageScale={1.2}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container}
          scrollViewProps={{
            onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
            onScrollEndDrag: () => console.log('onScrollEndDrag'),
          }}
        />
      </View>
    );
  }
}