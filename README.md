# Mobile Flashcards

## Installing and Launching

To install this app, you will need to clone the repository and install the [Yarn package manager][1]. Once you had completed those prerequisites, just navigate to the top-level directory of the project and run the following command:

```bash
yarn install && yarn start
```

You will need an Android device or emulator with the [Expo app][4] to run the app. It was **NOT** tested on iOS.

[1]: https://yarnpkg.com
[4]: https://expo.io

## Design Notes

The `AsyncStorage` store is a simple key-value store, and I used it as such. The are two main data-object classes in the program: cards and decks (more specifically, deck metadata). Each type has a UUID v4 identifier. These object IDs are the keys in the async store. The ID is repeated again in the object's record. The record also contains a `type` field (which is set via a constant in the app). The `type` field indicates whether the record is a deck or a card.

I took this approach, because it made `AsyncStorage` much easier to work with. I initially tried it use it as a deep data store (like you might use a Redux store), and it was a pain in the butt. The app's Redux store is more complex and includes a few levels of nesting. The `api` translates Redux structures to `AsyncStorage` when saving, and it converts them back again when loading.    

## Useful Links

- Udacity
	- [Udacity Sample App](https://github.com/udacity/reactnd-UdaciFitness-complete/tree/app-prep)
	- [Rubric](https://review.udacity.com/#!/rubrics/1021/view)
- Dev Tools
	- [Create React Native App](https://github.com/react-community/create-react-native-app)
	- [React Devtools outside of Chrome](https://www.npmjs.com/package/react-devtools)
	- [Remote Redux Dev Tools](https://www.npmjs.com/package/remote-redux-devtools)
	- [RemoteDev Server](https://github.com/zalmoxisus/remotedev-server)
- Packages
	- [Immutable](https://facebook.github.io/immutable-js/docs)
	- [React Native](https://facebook.github.io/react-native)
	- [React Navigation](https://reactnavigation.org)

## Create React Native App

This project was bootstrapped with [Create React Native App][2]. The most recent version of this guide is available [here][3].

[2]: https://github.com/react-community/create-react-native-app
[3]: https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md
