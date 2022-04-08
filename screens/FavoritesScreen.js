import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { FavoritesContext } from '../store/context/favorites-context';

import { MEALS } from '../data/dummy-data';
import MealsList from '../components/MealsList/MealsList';
import { useSelector } from 'react-redux';

function FavoritesScreen() {
	// const favoritesMealsContext = useContext(FavoritesContext);

	// const { ids } = favoritesMealsContext;

	const favoriteMealsIds = useSelector((state) => state.favorites.ids);

	const favoritesMeals = MEALS.filter((mealItem) =>
		favoriteMealsIds.includes(mealItem.id)
	);

	if (favoritesMeals.length === 0) {
		return (
			<View style={styles.rootContainer}>
				<Text style={styles.text}>You have no favorites meals yet.</Text>
			</View>
		);
	}

	return <MealsList items={favoritesMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
	},
});
