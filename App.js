import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { IconButton } from './src/components';

import { AddPlace, AllPlaces, Map, PlaceDetails } from './src/screens';

import { Colors, init } from './src/shared';

const Stack = createNativeStackNavigator();

export default function App() {
	const [dbInitialized, setDbInitialized] = useState(false);

	useEffect(() => {
		init()
			.then(() => {
				setDbInitialized(true);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	if (!dbInitialized) {
		return <AppLoading />;
	}

	return (
		<>
			<StatusBar style='dark' />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: Colors.primary500 },
						headerTintColor: Colors.primary800,
						contentStyle: { backgroundColor: Colors.gray700 },
					}}>
					<Stack.Screen
						name='AllPlaces'
						component={AllPlaces}
						options={({ navigation }) => ({
							title: 'Your Favorite Places',
							headerRight: ({ tintColor }) => (
								<IconButton
									icon='add'
									size={24}
									color={tintColor}
									onPress={() => navigation.navigate('AddPlace')}
								/>
							),
						})}
					/>
					<Stack.Screen
						name='AddPlace'
						component={AddPlace}
						options={{
							title: 'Add a new Place',
						}}
					/>
					<Stack.Screen name='Map' component={Map} />
					<Stack.Screen
						name='PlaceDetails'
						component={PlaceDetails}
						options={{
							title: 'Loading Place...',
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
