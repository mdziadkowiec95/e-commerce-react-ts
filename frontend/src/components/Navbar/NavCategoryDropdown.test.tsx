import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import NavCategoryDropdown from './NavCategoryDropdown';
import { renderWithRouter } from '../../../tests/helpers/router';
import { NavCategory } from 'common/types/categories';

const defaultCategory: NavCategory = {
  id: '1',
  categoryTree: 'notebooks',
  displayName: 'Notebooks',
};

const mockCategoryWithSubcategories: NavCategory = {
  ...defaultCategory,
  subcategories: [
    {
      id: '1',
      categoryTree: 'notebooks/chargers',
      displayName: 'Chargers',
    },
    {
      id: '2',
      categoryTree: 'notebooks/accessories',
      displayName: 'Accessories',
    },
  ],
};

describe('NavCategoryDropdown tests', () => {
  test('does not render dropdown when category is not provided', () => {
    const { container } = render(<NavCategoryDropdown category={undefined} />);
    const dropdownContainer = container.querySelector('nav-category-dropdown');
    expect(dropdownContainer).toEqual(null);
  });

  test('renders dropdown when category is provided', () => {
    const category: NavCategory = defaultCategory;
    const { getByTestId } = renderWithRouter(
      <NavCategoryDropdown category={category} />
    );
    expect(getByTestId('nav-category-dropdown')).toBeTruthy();
  });

  test('renders dropdown when category is provided', () => {
    const category = defaultCategory;
    const { getByTestId } = renderWithRouter(
      <NavCategoryDropdown category={category} />
    );
    expect(getByTestId('nav-category-dropdown')).toBeTruthy();
  });

  test('renders only root category link if no subcategories provided', () => {
    const category: NavCategory = {
      ...defaultCategory,
      displayName: 'Testing display name',
    };
    const { getByText, getByTestId } = renderWithRouter(
      <NavCategoryDropdown category={category} />
    );

    const rootCategoryLinkHref = getByText('Testing display name')
      .closest('a')
      ?.getAttribute('href');
    expect(rootCategoryLinkHref).toEqual('/products/notebooks');

    expect(getByTestId('nav-subcategories-wrap').children.length).toEqual(0);
  });

  test('renders subcategory links properly', () => {
    const { getByTestId } = renderWithRouter(
      <NavCategoryDropdown category={mockCategoryWithSubcategories} />
    );

    const subcategoryLinks = getByTestId('nav-subcategories-wrap').children;

    expect(subcategoryLinks[0].getAttribute('href')).toEqual(
      '/products/notebooks/chargers'
    );
    expect(subcategoryLinks[1].getAttribute('href')).toEqual(
      '/products/notebooks/accessories'
    );
    expect(subcategoryLinks[0].textContent).toEqual('Chargers');
    expect(subcategoryLinks[1].textContent).toEqual('Accessories');
  });

  test('clicking on parent category link toogles active class', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <NavCategoryDropdown category={mockCategoryWithSubcategories} />
    );

    fireEvent.click(getByText('Notebooks'));
    expect(getByTestId('nav-category-dropdown')).toHaveClass('is-active');
  });

  test('clicking on subcategory link navigates properly', () => {
    const { getByText, history } = renderWithRouter(
      <NavCategoryDropdown category={mockCategoryWithSubcategories} />
    );

    fireEvent.click(getByText(/Chargers/i));
    expect(history.location.pathname).toEqual('/products/notebooks/chargers');
  });
});
