import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Card} from './Card';
import {Movie} from '../../types';

const mockMovie = {
  id: 1,
  title: 'movie title',
  poster_path: 'test.jpg',
  overview: 'Test overview',
  release_date: '2021-01-01',
} as Movie;

describe('Card Component', () => {
  it('renders correctly building the imageUrl', () => {
    render(<Card item={mockMovie} onPressItem={jest.fn()} />);

    expect(screen.getByText('movie title')).toBeTruthy();
    expect(screen.getByTestId('poster-image').props.source.uri).toEqual(
      'https://image.tmdb.org/t/p/w500/test.jpg',
    );
  });
});
