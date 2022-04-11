import { useState, useEffect } from 'react';
import { Alert, View, StyleSheet, Image, Text } from 'react-native';
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from '@react-navigation/native';
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from 'expo-location';

import { getMapPreview, Colors, getAddres } from '../../shared';

import OutlinedButton from '../UI/OutlinedButton';

function LocationPicker({ onPickLocation }) {
	const [pickedLocation, setPickedLocation] = useState();

	const isFocused = useIsFocused();
	const navigation = useNavigation();
	const route = useRoute();

	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = route.params && {
				latitude: route.params.pickedLatitude,
				longitude: route.params.pickedLongitude,
			};
			setPickedLocation(mapPickedLocation);
		}
	}, [route, isFocused]);

	useEffect(() => {
		async function handleLocation() {
			if (pickedLocation) {
				const address = await getAddres(
					pickedLocation.latitude,
					pickedLocation.longitude
				);
				onPickLocation({ ...pickedLocation, address: address });
			}
		}

		handleLocation();

	}, [pickedLocation, onPickLocation]);

	async function verifyPermissions() {
		if (
			locationPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Insufficient Permissions!',
				'You need to grant camera permissions to use this app.'
			);
			return false;
		}

		return true;
	}

	async function getLocationHandler() {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}

		const location = await getCurrentPositionAsync();
		setPickedLocation({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		});
	}

	function pickOnMapHandler() {
		navigation.navigate('Map');
	}

	let locationPreview = <Text>No Location picked yet.</Text>;

	if (pickedLocation) {
		locationPreview = (
			<Image
				style={styles.image}
				source={{
					uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude),
				}}
			/>
		);
	}

	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton icon='location' onPress={getLocationHandler}>
					Locate User
				</OutlinedButton>
				<OutlinedButton icon='map' onPress={pickOnMapHandler}>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	);
}

export default LocationPicker;

const styles = StyleSheet.create({
	mapPreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderRadius: 4,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
	},
});
