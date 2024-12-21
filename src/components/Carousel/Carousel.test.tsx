import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {MovieData} from '../../types';
import {Carousel} from '.';

describe('Carousel', () => {
  const mockData = {
    loading: false,
    data: {
      results: [
        {id: 1, title: 'item 1', poster_path: '/path/to/image1.jpg'},
        {id: 2, title: 'item 2', poster_path: '/path/to/image2.jpg'},
        {id: 3, title: 'item 3', poster_path: '/path/to/image3.jpg'},
      ],
    },
  };

  it('renders without crashing', () => {
    render(
      <Carousel
        title="Test Carousel"
        items={mockData as MovieData}
        onPressItem={() => {}}
      />,
    );
    expect(screen.getByText('Test Carousel')).toBeTruthy();
    expect(screen.getByText('item 1')).toBeTruthy();
    expect(screen.getByText('item 2')).toBeTruthy();
    expect(screen.getByText('item 3')).toBeTruthy();
  });

  it('shows activity indicator when it is loading', () => {
    const loadingItems = {loading: true, data: {results: []}};
    render(
      <Carousel
        title="Test Carousel"
        items={loadingItems}
        onPressItem={() => {}}
      />,
    );
    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('shows No data available text when there are no results', () => {
    const emptyItems = {loading: false, data: {}};
    render(
      <Carousel
        title="Test Carousel"
        items={emptyItems}
        onPressItem={() => {}}
      />,
    );
    expect(screen.getByText('No data available')).toBeTruthy();
  });
});
