import instance from '../axios.config';

export async function storeExpense(expenseData) {
	const response = await instance.post('/expenses.json', expenseData);
	const id = response.data.name;
	return id;
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

export function updateExpense(id, expenseData) {
	return instance.put(`/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
	return instance.delete(`/expenses/${id}.json`);
}
