import { FlatList, View } from 'react-native';
import CategoryGridTitle from '../components/CategoryGridTItle';

import { CATEGORIES } from '../data/dummy_data';

function renderCategoryItem(itemData) {
	return <CategoryGridTitle title={itemData.item.title} color={itemData.item.color} />;
}

function CategoriesScreen(props) {
	return (
		<FlatList
			data={CATEGORIES}
			keyExtractor={(item) => item.id}
			renderItem={renderCategoryItem}
		/>
	);
}

export default CategoriesScreen;
