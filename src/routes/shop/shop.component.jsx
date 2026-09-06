import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import ProductPage from '../product/product.component';

const Shop = () => {
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
			<Route path=':category/:productId' element={<ProductPage />} />
		</Routes>
	);
};

export default Shop;
