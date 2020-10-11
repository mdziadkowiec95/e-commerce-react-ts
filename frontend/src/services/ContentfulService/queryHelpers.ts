export const getCategoryQuery = (
	parentCategory?: string,
	subCategory?: string
): string => {
	let query = '';

	if (parentCategory) {
		query += parentCategory;
	}

	if (subCategory) {
		query += parentCategory ? `/${subCategory}` : subCategory;
	}

	return query;
};


export const getOptionsForCategory = (
	parentCategory?: string,
	subCategory?: string
): { [key: string]: string; } => {
	const query = getCategoryQuery(parentCategory, subCategory);
	let options: { [key: string]: string; } = {};

	if (subCategory && parentCategory) {
		options = {
			'fields.category.sys.contentType.sys.id': 'category',
			'fields.category.fields.categoryTree': query,
		};
	} else if (parentCategory && !subCategory) {
		options = {
			'fields.rootCategory.sys.contentType.sys.id': 'category',
			'fields.rootCategory.fields.categoryTree': query,
		};
	}

	return options;
};