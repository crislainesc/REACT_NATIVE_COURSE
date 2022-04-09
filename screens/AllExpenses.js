import { useContext } from 'react';

import { ExpensesContext } from '../store/expenses-context';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function AllExpenses() {
	const expensesContext = useContext(ExpensesContext);

	const { expenses } = expensesContext;

	return <ExpensesOutput expenses={expenses} expensesPeriod='Total' />;
}

export default AllExpenses;
