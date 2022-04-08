import { View, Text, StyleSheet } from 'react-native';

function MealDetailsScreen({ route, navigation }) {
	const { mealId } = route.params;

	return <Text>This is the Meal Detail Screen ({mealId})</Text>;
}

export default MealDetailsScreen;
