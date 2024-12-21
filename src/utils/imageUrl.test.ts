import {buildImageUrl} from './ImageUrl';

describe('buildImageUrl', () => {
  it('returns the url with the image path', () => {
    const imagePath = 'path/to/image.jpg';
    const expected = `https://image.tmdb.org/t/p/w500/${imagePath}`;
    expect(buildImageUrl(imagePath)).toBe(expected);
  });

  it('returns the url when the image path is an empty string', () => {
    const imagePath = '';
    const expected = `https://image.tmdb.org/t/p/w500/`;
    expect(buildImageUrl(imagePath)).toBe(expected);
  });
});
