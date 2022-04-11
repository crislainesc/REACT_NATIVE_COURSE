import { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { IconButton } from '../components';

function Map({ navigation, route }) {
	const initialLocation = route.params && {
		latitude: route.params.initialLatitude,
		longitude: route.params.initialLongitude,
	};

	const [selectedLocation, setSelectedLocation] = useState(initialLocation);

	const region = {
		latitude: initialLocation ? initialLocation.latitude : 37.78,
		longitude: initialLocation ? initialLocation.longitude : -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	function selectLocationHandler(event) {
		const latitude = event.nativeEvent.coordinate.latitude;
		const longitude = event.nativeEvent.coordinate.longitude;

		setSelectedLocation({ latitude: latitude, longitude: longitude });
	}

	const savePickedLoacationHandler = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert(
				'No location picked!',
				'You have to pick a location (by tapping on the map) first!'
			);
			return;
		}

		navigation.navigate('AddPlace', {
			pickedLatitude: selectedLocation.latitude,
			pickedLongitude: selectedLocation.longitude,
		});
	}, [navigation, selectedLocation]);

	useLayoutEffect(() => {
		if(initialLocation) {
			return;
		}
		navigation.setOptions({
			headerRight: ({ tintColor }) => (
				<IconButton
					icon='save'
					size={24}
					color={tintColor}
					onPress={savePickedLoacationHandler}
				/>
			),
		});
	}, [navigation, savePickedLoacationHandler]);

	return (
		<MapView
			style={styles.map}
			initialRegion={region}
			onPress={selectLocationHandler}>
			{selectedLocation && (
				<Marker
					title='Picked Location'
					coordinate={{
						latitude: selectedLocation.latitude,
						longitude: selectedLocation.longitude,
					}}
				/>
			)}
		</MapView>
	);
}

export default Map;

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});
