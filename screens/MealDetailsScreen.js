import { View, Text, Image, StyleSheet } from 'react-native';

import { MEALS } from '../data/dummy_data';

import MealDetails from '../components/MealDetails';

function MealDetailsScreen({ route, navigation }) {
	const { mealId } = route.params;

	const selectedMeal = MEALS.find((meal) => meal.id === mealId);

	return (
		<View>
			<Image source={{ uri: selectedMeal.imageUrl }} />
			<Text>{selectedMeal.title}</Text>
			<View>
				<MealDetails
					complexity={selectedMeal.complexity}
					duration={selectedMeal.duration}
					affordability={selectedMeal.affordability}
				/>
			</View>
			<Text>Ingredients</Text>
			{selectedMeal.ingredients.map((ingredient) => (
				<Text key={ingredient}>{ingredient}</Text>
			))}
			<Text>Steps</Text>
         {selectedMeal.steps.map((step) => (
				<Text key={step}>{step}</Text>
			))}
		</View>
	);
}

export default MealDetailsScreen;
