import { View, TextInput } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

function StartGameScreen(props) {
	return (
		<View>
			<TextInput />
			<PrimaryButton>Reset</PrimaryButton>
			<PrimaryButton>Confirm</PrimaryButton>
		</View>
	);
}

export default StartGameScreen;
