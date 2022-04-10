import instance from '../axios.config';

//  [API_KEY]

const API_KEY = '[API_KEY]';

export async function createUser(email, password) {
	const response = await instance.post(`signUp?key=${API_KEY}`, {
		email,
		password,
		returnSecureToken: true,
	});
}
