import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [goals, setGoals] = useState([]);

	function startAddGoalHandler() {
		setModalIsVisible(true);
	}

	function addGoalHandler(enteredGoalText) {
		setGoals((currentGoals) => [
			...currentGoals,
			{ text: enteredGoalText, id: Math.random().toString() },
		]);
    setModalIsVisible(false)
	}

	function deleteGoalHandler(id) {
		setGoals((currentGoals) => {
			return currentGoals.filter((goal) => goal.id !== id);
		});
	}

	return (
		<View style={styles.appContainer}>
			<Button
				title='Add New Goal'
				color='#5e0acc'
				onPress={startAddGoalHandler}
			/>
			<GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} />
			<View style={styles.goalsContainer}>
				<FlatList
					data={goals}
					renderItem={(itemData) => {
						return (
							<GoalItem
								id={itemData.item.id}
								text={itemData.item.text}
								onDeleteItem={deleteGoalHandler}
							/>
						);
					}}
					keyExtractor={(item, index) => {
						return item.id;
					}}
					alwaysBounceVertical={false}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		padding: 50,
		paddingHorizontal: 16,
	},

	goalsContainer: {
		flex: 4,
	},
});
