import { CategoryEntry, NavCategories, NavCategory } from "../../common/types/categories";

// Map single contentful category entry to extract only needed data
const mapCategory = (category: CategoryEntry): NavCategory => {
	const { categoryTree, displayName } = category.fields;
	const { id } = category.sys;

	return {
		id,
		categoryTree,
		displayName,
	};
};

// Map contentful categories data structure to make it easier to render deep navigation
export const mapCategories = (categories: CategoryEntry[]): NavCategories => {
	return categories.reduce(
		(result: NavCategories, category: CategoryEntry): NavCategories => {
			const { parentCategory, categoryTree } = category.fields;

			if (!categoryTree) return result;

			if (!parentCategory) {
				if (result[categoryTree]) {
					return result;
				} else {
					return {
						...result,
						[categoryTree]: {
							...mapCategory(category),
							subcategories: [],
						},
					};
				}
			} else {
				const parentCategoryFieldName = parentCategory.fields.categoryTree;

				if (result[parentCategoryFieldName]) {
					result[parentCategoryFieldName].subcategories?.push(
						mapCategory(category)
					);
					return result;
				} else {
					return {
						...result,
						[`${parentCategoryFieldName}`]: {
							...mapCategory(parentCategory),
							subcategories: [mapCategory(category)],
						},
					};
				}
			}
		},
		{}
	);
}