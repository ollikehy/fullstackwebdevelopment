import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const token = await AsyncStorage.getItem(
            `${this.namespace}:token`
        );
        return token
    }

    async setAccessToken(accessToken) {
        console.log('setting access token')
        await AsyncStorage.setItem(`${this.namespace}:token`, accessToken)
    }

    async removeAccessToken() {
        console.log('removing access token')
        await AsyncStorage.removeItem(`${this.namespace}:token`);
    }
}

export default AuthStorage;