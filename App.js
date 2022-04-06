import { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	ScrollView,
	FlatList,
} from 'react-native';

import GoalItem from './components/index';

export default function App() {
	const [enteredGoalText, setEnteredGoalText] = useState('');
	const [goals, setGoals] = useState([]);

	function goalInputHandler(enteredText) {
		setEnteredGoalText(enteredText);
	}

	function addGoalHandler() {
		setGoals((currentGoals) => [
			...currentGoals,
			{ text: enteredGoalText, id: Math.random().toString() },
		]);
		setEnteredGoalText('');
	}

	return (
		<View style={styles.appContainer}>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.textInput}
					placeholder='Your course goal!'
					onChangeText={goalInputHandler}
					value={enteredGoalText}
				/>
				<Button title='Add Goal' onPress={addGoalHandler} />
			</View>
			<View style={styles.goalsContainer}>
				<FlatList
					data={goals}
					renderItem={(itemData) => {
						return <GoalItem />;
					}}
					keyExtractor={(item, index) => {
						return item.id;
					}}
					alwaysBounceVertical={false}></FlatList>
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

	inputContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 24,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},

	textInput: {
		borderWidth: 1,
		borderColor: '#7ce',
		width: '70%',
		marginRight: 8,
		padding: 5,
	},

	goalsContainer: {
		flex: 4,
	},

	goalItem: {
		margin: 8,
		padding: 8,
		borderRadius: 8,
		backgroundColor: '#5e0acc',
	},

	goalText: {
		color: 'white',
	},
});
