import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

import { ExpensesContext } from '../store/expenses-context';

import { fetchExpenses } from '../shared/services';

import { getDateMinusDays } from '../utils/getDateMinusDays';

function RecentExpenses() {
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState();

	const expensesContext = useContext(ExpensesContext);

	useEffect(() => {
		async function getExpenses() {
			setIsFetching(true);
			try {
				const expenses = await fetchExpenses();
				expensesContext.setExpenses(expenses);
			} catch (error) {
				setError('Could not fetch expenses!');
			}
			setIsFetching(false);
		}

		getExpenses();
	}, []);

	function errorHandler() {
		setError(null);
	}

	if (isFetching) {
		return <LoadingOverlay />;
	}

	if (error && !isFetching) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}

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
