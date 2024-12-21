import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from './api';

describe('fetchTrendingMovies', () => {
  it('fetches trending movies', async () => {
    const mockMovies = [{id: 1, title: 'Movie trending'}];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockMovies),
      }),
    ) as jest.Mock;

    const result = await fetchTrendingMovies();
    expect(result).toEqual(mockMovies);
  });

  it('handles API errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('error')),
    ) as jest.Mock;
    await expect(fetchTrendingMovies()).rejects.toThrow(
      "Couldn't fetch data from API",
    );
  });
});

describe('fetchTopRatedMovies', () => {
  it('fetches top rated movies', async () => {
    const mockMovies = [{id: 1, title: 'Movie top rated'}];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockMovies),
      }),
    ) as jest.Mock;

    const result = await fetchTopRatedMovies();
    expect(result).toEqual(mockMovies);
  });

  it('hadnles API errors', async () => {
    global.fetch = jest.fn(() => Promise.reject('error')) as jest.Mock;
    await expect(fetchTopRatedMovies()).rejects.toThrow(
      "Couldn't fetch data from API",
    );
  });
});

describe('fetchUpcomingMovies', () => {
  it('fetches upcoming movies', async () => {
    const mockMovies = [{id: 1, title: 'Upcoming movie'}];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockMovies),
      }),
    ) as jest.Mock;

    const result = await fetchUpcomingMovies();
    expect(result).toEqual(mockMovies);
  });

  it('handles API errors', async () => {
    global.fetch = jest.fn(() => Promise.reject('error')) as jest.Mock;
    await expect(fetchUpcomingMovies()).rejects.toThrow(
      "Couldn't fetch data from API",
    );
  });
});
