import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

export default instance;
