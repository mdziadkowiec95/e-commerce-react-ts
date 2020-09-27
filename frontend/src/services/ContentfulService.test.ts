import { ContentfulServiceFactory } from "./ContentfulService";

describe('ContentfulService tests', () => {
	test('dependency injection of client works properly', () => {
		const mockContentfulClient = {
			getEntries: () => 'DI works in ContentfulService!',
		} as any;

		const service = ContentfulServiceFactory(mockContentfulClient);

		expect(service.getClient().getEntries()).toEqual('DI works in ContentfulService!');
	})
});