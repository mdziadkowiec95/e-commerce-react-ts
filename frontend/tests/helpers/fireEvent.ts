import { fireEvent } from '@testing-library/react';

// A helper function to simplify the "fireEvent.change" function
export const changeInputValue = (element: Document | Node | Element | Window, value: string): boolean => fireEvent.change(element, {
	target: {
		value
	}
});