import { ContentfulServiceFactory } from "./ContentfulService";
import { mockCategories } from '../../tests/mocks/contentful-categories';

describe('ContentfulService tests', () => {
	test('dependency injection of client works properly', () => {
		const mockContentfulClient = {
			getEntries: () => 'DI works in ContentfulService!',
		} as any;

		const service = ContentfulServiceFactory(mockContentfulClient);

		expect(service.getClient().getEntries()).toEqual('DI works in ContentfulService!');
	});

	describe('ContentfulService/getCategories', () => {
		test('returns data properly mapped', async () => {
			const mockContentfulClient = {
				getEntries() {
					return Promise.resolve(mockCategories);
				},
			} as any;

			const service = ContentfulServiceFactory(mockContentfulClient);
			const categories = await service.getCategories();

			categories.forEach(category => {
				expect(category.sys).toHaveProperty('id');
				expect(Object.keys(category.sys).length).toBe(1);

				const fields = ['displayName', 'categoryDescription', 'categoryTree', 'parentCategory'];
				fields.forEach(field => expect(category.fields).toHaveProperty(field));
				expect(Object.keys(category.fields).length).toEqual(fields.length);
			});
		});
	});
}); 