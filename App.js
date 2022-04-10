import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';

import { Colors } from './shared/constants/styles';

import AuthContextProvider, { AuthContext } from './store/auth-context';

const Stack = createNativeStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}>
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Signup' component={SignupScreen} />
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	const authContext = useContext(AuthContext);

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}>
			<Stack.Screen
				name='Welcome'
				component={WelcomeScreen}
				options={{
					headerRight: ({ tintColor }) => (
						<Ionicons
							name='exit'
							color={tintColor}
							size={24}
							onPress={authContext.logout}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
}

function Navigation() {
	const authContext = useContext(AuthContext);

	return (
		<NavigationContainer>
			{!authContext.isAuthenticated && <AuthStack />}
			{authContext.isAuthenticated && <AuthenticatedStack />}
		</NavigationContainer>
	);
}

function Root() {
	const [isTryingLogin, setIsTryingLogin] = useState(true);

	const authContext = useContext(AuthContext);

	useEffect(() => {
		async function fetchToken() {
			const storedToken = await AsyncStorage.getItem('token');

			if (storedToken) {
				authContext.authenticate(storedToken);
			}

			setIsTryingLogin(false);
		}

		fetchToken();
	}, []);

	if (isTryingLogin) {
		return <AppLoading />;
	}

	return <Navigation />;
}

export default function App() {
	useEffect(() => {
		async function getToken() {
			const storedToken = await AsyncStorage.getItem('token');

			if (storedToken) {
			}
		}

		getToken();
	}, []);

	return (
		<>
			<StatusBar style='light' />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}
