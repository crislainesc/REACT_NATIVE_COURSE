import { StyleSheet } from 'react-native';

function GoalItem(props) {
	return (
		<View style={styles.goalItem}>
			<Text style={styles.goalText}>{props.goal}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
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

export default GoalItem;
