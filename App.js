import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<>
			<StatusBar style='light' />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: '#351401' },
						headerTintColor: 'white',
						contentStyle: { backgroundColor: '#3f2f25' },
					}}>
					<Stack.Screen
						name='MealsCategories'
						component={CategoriesScreen}
						options={{
							headerTitle: 'All Caregories',
						}}
					/>
					<Stack.Screen
						name='MealsOverview'
						component={MealsOverviewScreen}
						// options={({ route, navigation }) => {
						// 	const { categoryId } = route.params;
						// 	return {
						// 		title: categoryId
						// 	};
						// }}
					/>
					<Stack.Screen name='MealDetail' component={MealDetailsScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {},
});
