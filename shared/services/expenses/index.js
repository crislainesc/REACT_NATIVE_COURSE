import instance from '../axios.config';

export function storeExpense(expenseData) {
	instance.post('/expenses.json', expenseData);
}
