import { useState } from 'react';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { login } from '../shared/services';

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	async function loginHandler({ email, password }) {
		setIsAuthenticating(true);
		await login(email, password);
		setIsAuthenticating(false);
	}

	if (isAuthenticating) {
		return <LoadingOverlay message='Loading...' />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
