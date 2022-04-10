import { useContext, useEffect, useState } from 'react';

import { ExpensesContext } from '../store/expenses-context';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getDateMinusDays } from '../utils/getDateMinusDays';
import { fetchExpenses } from '../shared/services';

function RecentExpenses() {
	const expensesContext = useContext(ExpensesContext);

	useEffect(() => {
		async function getExpenses() {
			const expenses = await fetchExpenses();
			expensesContext.setExpenses(expenses);
		}

		getExpenses();
	}, []);

	const recentExpenses = expensesContext.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date > date7DaysAgo && expense.date <= today;
	});

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod='Last 7 Days'
			fallbackText='No expenses registered for the last 7 days.'
		/>
	);
}

export default RecentExpenses;
