import { observable, action, reaction } from 'mobx';
import { AsyncStorage } from 'react-native';

class CommonStore {
  @observable appName = 'dummy';

  @observable token = null;

  @observable appLoaded = false;

  @observable isLoadingTags = false;

  @observable hasToken = () => this.token !== null;

  constructor() {
    this.getToken();
    reaction(
      () => this.token,
      token => {
        if (token) {
          AsyncStorage.setItem('jwt', token);
        } else {
          AsyncStorage.removeItem('jwt');
        }
      }
    );
  }

  async getToken() {
    const jwt = await AsyncStorage.getItem('jwt');
    this.token = jwt;
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
