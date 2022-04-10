import instance from '../axios.config';

//  [API_KEY]

const API_KEY = '[API_KEY]';

async function authenticate(mode, email, password) {
	const response = await instance.post(`:${mode}?key=${API_KEY}`, {
		email: email,
		password: password,
		returnSecureToken: true,
	});
}

export async function createUser(email, password) {
	await authenticate('signUp', email, password);
}

export async function login(email, password) {
	await authenticate('signInWithPassword', email, password);
}