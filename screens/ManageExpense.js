import { useLayoutEffect } from 'react';
import { Text } from 'react-native';

function ManageExpense({ route, navigation }) {
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, [isEditing, navigation]);

	return <Text>Manage Expense Screen</Text>;
}

export default ManageExpense;
