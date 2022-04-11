import { PlaceForm } from '../components';

import { insertPlace } from '../shared';

function AddPlace({ navigation }) {
	async function createPlaceHandler(place) {
		await insertPlace(place);
		navigation.navigate('AllPlaces');
	}

	return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
