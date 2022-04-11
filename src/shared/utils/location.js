// [API_KEY]

const GOOGLE_API_KEY = 'AIzaSyDypytoaHh1F40akHZ9TilixHQY4Lu-xrc';

export function getMapPreview(latitude, longitude) {
	const imagepreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=400x200&maptype=roadmap&markers=color:green%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

	return imagepreviewUrl;
}

export async function getAddres(latitude, longitude) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Failed to fetch address!');
	}

	const data = await response.json();
	const address = data.results[0].formatted_address;
	return address;
}
