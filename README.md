# JoyID React Native Demo

## Install

```bash
npm install
```

## Run

```bash
npm run ios
# or npm run android
```

## Tutorial

This tutorial will guide you through the steps to connect JoyID to your React Native application. JoyID provides a seamless integration for identity verification and authentication services. By following these steps, you'll be able to set up deep linking and utilize the JoyID React Native API.

### Prerequisites

Before getting started, make sure you have the following:

* React Native development environment set up
* npm (Node Package Manager) installed

### Step 1: Set up deep linking

To enable deep linking in your React Native app, follow the [instructions](https://reactnative.dev/docs/linking) provided in the React Native documentation. Deep linking allows your app to open specific URLs and handle them appropriately.

### Step 2: Install dependencies

Install the required dependencies by running the following command in your project directory:

```bash
npm install @joyid/react-native react-native-url-polyfill
```

This command will install the `@joyid/react-native` package, which provides the JoyID API for React Native integration, and the `react-native-url-polyfill` package, which is a polyfill for the URL object.

### Step 3: Import the polyfill

In your root file (usually `index.js` or `App.js`), import the URL polyfill to ensure compatibility:

```js
import 'react-native-url-polyfill/auto';
```

This line will import the polyfill for the URL object, which is required for the JoyID API.

### Step 4: Generate the redirect URL

Utilize the JoyID API provided by `@joyid/react-native` to generate a redirect URL. Pass the deep linking URL generated in Step 1 as the redirectURL parameter. Here's an example of how to do it:

```js
import { generateAuthURL, initConfig } from '@joyid/react-native';

// init config
initConfig({
    name: 'Example App',
    logo: "https://example.com/logo.png"
})

// Generate the redirect URL
const redirectURL = '<your_deep_linking_url>';
const joyIDURL = generateAuthURL(redirectURL);
```

Replace <your_deep_linking_url> with the actual deep linking URL you obtained in Step 1.

### Step 5: Open the URL in a browser

Finally, open the generated JoyID URL in a browser. You can use any method available in React Native to achieve this, such as the Linking module. Here's an example:

```js
import { Linking } from 'react-native';

// Open the JoyID URL in a browser
Linking.openURL(joyIDURL);
```

This will open the JoyID URL in the default browser on the device, allowing the user to complete the identity verification process.

Congratulations! You have successfully connected JoyID to your React Native app. Users can now verify their identity seamlessly using JoyID's services.
