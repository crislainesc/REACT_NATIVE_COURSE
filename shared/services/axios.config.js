import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-native-http-de2b8-default-rtdb.firebaseio.com',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

export default instance;
