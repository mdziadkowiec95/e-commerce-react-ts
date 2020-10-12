import { ContentfulServiceFactory } from ".";
import { mockCategories, mockProducts } from '../../../tests/mocks/contentful';
import { createContentfulServiceStub } from '../../../tests/stubs/ContentfulClientStub';

describe('ContentfulService tests', () => {
	let ContentfulServiceStub: any;

	beforeEach(() => {
		ContentfulServiceStub = createContentfulServiceStub();
	});

	test('dependency injection of client works properly', () => {
		const mockContentfulClient = {
			getEntries: () => 'DI works in ContentfulService!',
		} as any;

		const service = ContentfulServiceFactory(mockContentfulClient);

		expect(service.getClient().getEntries()).toEqual('DI works in ContentfulService!');
	});

	describe('ContentfulService/getCategories', () => {
		let getEntriesSpy: any;

		beforeEach(() => {
			getEntriesSpy = jest.spyOn(ContentfulServiceStub, 'getEntries');
		});

		test('returns data properly mapped', async () => {
			getEntriesSpy.mockReturnValue(Promise.resolve(mockCategories));
			const service = ContentfulServiceFactory(ContentfulServiceStub);
			const categories = await service.getCategories();

			categories.forEach(category => {
				expect(category.sys).toHaveProperty('id');
				expect(Object.keys(category.sys).length).toBe(1);

				const fields = ['displayName', 'categoryDescription', 'categoryTree', 'parentCategory'];
				fields.forEach(field => expect(category.fields).toHaveProperty(field));
				expect(Object.keys(category.fields).length).toEqual(fields.length);
			});
		});

		test('should pass only "content_type" field in the query', async () => {
			getEntriesSpy.mockReturnValue(Promise.resolve(mockCategories));
			const service = ContentfulServiceFactory(ContentfulServiceStub);
			await service.getCategories();

			expect(getEntriesSpy).toHaveBeenCalledWith({ content_type: 'category' });
		});
	});

	describe('ContentfulService/getProducts', () => {
		let getEntriesSpy: any;

		beforeEach(() => {
			getEntriesSpy = jest.spyOn(ContentfulServiceStub, 'getEntries');
		});

		test('should call getEntries once', async () => {
			getEntriesSpy.mockReturnValue(Promise.resolve(mockProducts));
			const service = ContentfulServiceFactory(ContentfulServiceStub);
			await service.getProducts();

			expect(getEntriesSpy).toHaveBeenCalledTimes(1);
		});

		test('should construct a query for all products when no cateogry is provided', async () => {
			getEntriesSpy.mockReturnValue(Promise.resolve(mockProducts));
			const service = ContentfulServiceFactory(ContentfulServiceStub);
			await service.getProducts();

			expect(getEntriesSpy).toHaveBeenCalledWith({ content_type: 'product' });
		});

		test('should construct a query properly when only root category is provided', async () => {
			getEntriesSpy.mockReturnValue(Promise.resolve(mockProducts));
			const service = ContentfulServiceFactory(ContentfulServiceStub);
			await service.getProducts('notebooks');

			expect(getEntriesSpy).toHaveBeenCalledWith({
				content_type: 'product',
				'fields.rootCategory.sys.contentType.sys.id': 'category',
				'fields.rootCategory.fields.categoryTree': 'notebooks'
			});
		});

		test('should construct a query properly when both parent and sub category is provided', async () => {
			getEntriesSpy.mockReturnValue(Promise.resolve(mockProducts));
			const service = ContentfulServiceFactory(ContentfulServiceStub);
			await service.getProducts('notebooks', 'chargers');

			expect(getEntriesSpy).toHaveBeenCalledWith({
				content_type: 'product',
				'fields.category.sys.contentType.sys.id': 'category',
				'fields.category.fields.categoryTree': 'notebooks/chargers',
			});
		});

		test('should return products propertly mapped', async () => {
			getEntriesSpy.mockReturnValue(Promise.resolve(mockProducts));
			const service = ContentfulServiceFactory(ContentfulServiceStub);
			const data = await service.getProducts();

			expect(data.items[0]).toEqual({
				"id": "4BqrajvA8E6qwgkieoqmqO",
				"productName": "Asus ZenBook",
				"slug": "asus-zenbook",
				"productDescription": "Description mapped",
				"image": [
					{
						"sys": {
							"type": "Link",
							"linkType": "Asset",
							"id": "KTRF62Q4gg60q6WCsWKw8"
						}
					}
				],
				"price": 120,
				"quantity": 3,
				"sku": "B00MG4ULK2",
				"category": {
					"sys": {
						"type": "Link",
						"linkType": "Entry",
						"id": "24DPGBDeGEaYy8ms4Y8QMQ"
					}
				}
			});
		});
	});
}); 