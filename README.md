# The movie app

Application done with react native, fetching the data from The Movie Database.
Works on iOS and Android. Focused on portrait mode

## Demo online

Fee free to take a look at the demo in Appetize:

- [Android](https://appetize.io/app/b_xh2ozfjx7mz6hqkqqljmya6ml4) device
- [iOS](https://appetize.io/app/b_dv63ribql4jmeyuqnsiml34nwy) device

## Start app:

If you want to run the app for the first time on iOS, you should run first:

```bash
yarn pods:install
```

then, no matter the device, run:

```bash
yarn start
```

### For Android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```

## Technical specifications

- Added a simple Layout reusable in all the pages
- Created 2 contexts in hooks folder:
   - useMovies for fetching movies data and selecting the movie
   - useWishlist for accessing and updating the wishlist
- Created a simple router that only stores the current page accessed
- Used ThemeProvider from styled-components in MovieDetails as an strategy to change the fonts depending on the list selected
- Used react-testing-library for unit tests
- Created a Common.tsx file for reused components across the app

## Next steps

There are some next steps detected that could fix or improve the app:
- Add AsyncStorage to persist the state of the wishlist
- Add integration tests checking the complete behavior of the app
- Accessibility
- Tablets compatibility
- Going to movie details and then coming back to the Home menu, if pressing the same movie should go to movie details again
