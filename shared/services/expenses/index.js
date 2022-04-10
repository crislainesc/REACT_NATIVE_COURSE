import instance from '../axios.config';

export function storeExpense(expenseData) {
	instance.post('/expenses.json', expenseData);
}

export async function fetchExpenses() {
	const response = await instance.get('/expenses.json');

	const expenses = [];

	for (const key in response.data) {
		const expenseObject = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			description: response.data[key].description,
		};

		expenses.push(expenseObject);
	}

	return expenses;
}
