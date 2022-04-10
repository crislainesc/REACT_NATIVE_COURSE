import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { AuthContext } from '../store/auth-context';

import { createUser } from '../shared/services';

function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const authContext = useContext(AuthContext);

	async function singUpHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			const token = await createUser(email, password);
			authContext.authenticate(token);
		} catch (error) {
			Alert.alert(
				'Authentication failed!',
				'Could not create user. Please check your input or try again later!'
			);
		}
		setIsAuthenticating(false);
	}

	if (isAuthenticating) {
		return <LoadingOverlay message='Creating user...' />;
	}

	return <AuthContent onAuthenticate={singUpHandler} />;
}

export default SignupScreen;
