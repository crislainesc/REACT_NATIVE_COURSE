import { View } from 'react-native';
import Input from './Input';

function ExpenseForm(props) {
	function amountChangeHandler() {}
	function dateChangeHandler() {}

	return (
		<View>
			<Input
				label='Amount'
				textInputConfig={{
					keyboardType: 'decimal-pad',
					onChangeText: amountChangeHandler,
				}}
			/>
			<Input
				label='Date'
				textInputConfig={{
					placeholder: 'YYYY-MM-DD',
					maxLength: 10,
					onChangeText: dateChangeHandler,
				}}
			/>
			<Input
				label='Description'
				textInputConfig={{
					multiline: true,
					// autoCapitalize: 'none'
					// autoCorrect: false // default is true
				}}
			/>
		</View>
	);
}

export default ExpenseForm;
