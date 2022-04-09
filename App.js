import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';

import { Ionicons } from '@expo/vector-icons';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';

import { GlobalStyles } from './styles/index';
import IconButton from './components/UI/IconButton';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
	return (
		<BottomTab.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon='add'
						size={24}
						color={tintColor}
						onPress={() => {}}
					/>
				),
			}}>
			<BottomTab.Screen
				name='RecentExpenses'
				component={RecentExpenses}
				options={{
					title: 'Recent Expenses',
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='hourglass' color={color} size={size} />
					),
				}}
			/>
			<BottomTab.Screen
				name='AllExpenses'
				component={AllExpenses}
				options={{
					title: 'All Expenses',
					tabBarLabel: 'All Expenses',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='calendar' color={color} size={size} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style='light' />
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='ExpensesOverview'
						component={ExpensesOverview}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen name='ManageExpense' component={ManageExpense} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
