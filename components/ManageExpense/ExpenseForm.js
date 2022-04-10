import { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import Input from './Input';
import Button from '../UI/Button';

import { GlobalStyles } from '../../styles';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
	const [inputValues, setInputValues] = useState({
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : '',
			isValid: true,
		},
		date: {
			value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
			isValid: true,
		},
		description: {
			value: defaultValues ? defaultValues.description : '',
			isValid: true,
		},
	});

	function inputChangedHandler(inputIdentifier, enteredValue) {
		setInputValues((currentInputValues) => {
			return {
				...currentInputValues,
				[inputIdentifier]: { value: enteredValue, isValid: true },
			};
		});
	}

	function submitHandler() {
		const expenseData = {
			amount: +inputValues.amount.value,
			date: new Date(inputValues.date.value),
			description: inputValues.description.value,
		};

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			// Alert.alert('Invalid input', 'Please check your input values ');
			setInputValues((currentInputValues) => {
				return {
					amount: {
						value: currentInputValues.amount.value,
						isValid: amountIsValid,
					},
					date: {
						value: currentInputValues.date.value,
						isValid: dateIsValid,
					},
					description: {
						value: currentInputValues.description.value,
						isValid: descriptionIsValid,
					},
				};
			});
			return;
		}

		onSubmit(expenseData);
	}

	const formIsInvalid =
		!inputValues.amount.isValid ||
		!inputValues.date.isValid ||
		!inputValues.description.isValid;

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputsRow}>
				<Input
					style={styles.rowInput}
					label='Amount'
					invalid={!inputValues.amount.isValid}
					textInputConfig={{
						keyboardType: 'decimal-pad',
						onChangeText: inputChangedHandler.bind(this, 'amount'),
						value: inputValues.amount.value,
					}}
				/>
				<Input
					style={styles.rowInput}
					label='Date'
					invalid={!inputValues.date.isValid}
					textInputConfig={{
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						onChangeText: inputChangedHandler.bind(this, 'date'),
						value: inputValues.date.value,
					}}
				/>
			</View>
			<Input
				label='Description'
				invalid={!inputValues.description.isValid}
				textInputConfig={{
					multiline: true,
					onChangeText: inputChangedHandler.bind(this, 'description'),
					value: inputValues.description.value,
					// autoCapitalize: 'none'
					// autoCorrect: false // default is true
				}}
			/>
			{formIsInvalid && (
				<Text style={styles.errorText}>
					Invalid input values - please check your entered data!
				</Text>
			)}

			<View style={styles.buttons}>
				<Button style={styles.button} mode='flat' onPress={onCancel}>
					Cancel
				</Button>
				<Button style={styles.button} onPress={submitHandler}>
					{submitButtonLabel}
				</Button>
			</View>
		</View>
	);
}

export default ExpenseForm;

const styles = StyleSheet.create({
	form: {
		marginTop: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
		marginVertical: 24,
		textAlign: 'center',
	},
	inputsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowInput: {
		flex: 1,
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
	errorText: {
		textAlign: 'center',
		color: GlobalStyles.colors.error500,
		margin: 8,
		fontWeight: 'bold',
		fontSize: 16,
	},
});
