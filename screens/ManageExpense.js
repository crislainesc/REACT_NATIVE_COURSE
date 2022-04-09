import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

import { ExpensesContext } from '../store/expenses-context';

import { GlobalStyles } from '../styles';

function ManageExpense({ route, navigation }) {
	const expensesContext = useContext(ExpensesContext);

	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, [isEditing, navigation]);

	function deleteExpenseHandler() {
		expensesContext.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler() {
		if (isEditing) {
			expensesContext.updateExpense(editedExpenseId, {
				description: 'Expense Updated',
				amount: 28.88,
				date: new Date('2022-04-09'),
			});
		} else {
			expensesContext.addExpense({
				description: 'Expense Description',
				amount: 28.88,
				date: new Date('2022-04-09'),
			});
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpenseForm />
			<View style={styles.buttons}>
				<Button style={styles.button} mode='flat' onPress={cancelHandler}>
					Cancel
				</Button>
				<Button style={styles.button} onPress={confirmHandler}>
					{isEditing ? 'Update' : 'Add'}
				</Button>
			</View>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon='trash'
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
}

export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
});
