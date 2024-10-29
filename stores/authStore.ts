import { makeAutoObservable } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStore {
  user: any = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  setUser(user: any) {
    this.user = user;
    this.saveUser(user);
  }

  setUserData(data: any) {
    this.user = data;
    this.saveUser(data);
  }

  async saveUser(user: any) {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('@user', jsonValue);
    } catch (e) {
      console.error('Failed to save user data:', e);
    }
  }

  async loadUser() {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      if (jsonValue != null) {
        this.user = JSON.parse(jsonValue);
      }
    } catch (e) {
      console.error('Failed to load user data:', e);
    }
  }

  async clearUser() {
    this.user = null;
    try {
      await AsyncStorage.removeItem('@user');
    } catch (e) {
      console.error('Failed to clear user data:', e);
    }
  }
}

const authStore = new AuthStore();
export default authStore;
