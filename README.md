# rn-use-shake

<!-- ![preview-cover](./docs/images/preview.png) -->

> 📱 React Native useShake hook that helps detecting shake gesture with phone accelerometer.

<!-- **Please, don't use this module for production yet! (See issues)** -->

<!-- [![npm version](https://img.shields.io/npm/v/use-shake-callback.svg?style=flat-square)](https://www.npmjs.org/package/rn-use-shake)
[![weekly downloads](https://img.shields.io/npm/dw/use-shake-callback.svg?style=flat-square)](https://www.npmjs.org/package/rn-use-shake)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/use-shake-callback.svg?style=flat-square)](https://www.npmjs.org/package/rn-use-shake)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)

[![NPM](https://nodei.co/npm/use-shake-callback.png)](https://nodei.co/npm/use-shake-callback/)

## 📦 Installation

- Please note that this package uses `rxjs` and `react-native-sensors` as dependencies and have `react` and `react-native` as peer dependencies.

```bash
npm add use-shake-callback
# Or with yarn
yarn add use-shake-callback
```

## 🚀 Usage

- The first argument of the hook is the callback function - It's only argument is `speed`, which is the speed of your shake at the time the callback is called.
- Second argument is the configuration object - All fields optional.
- It is strongly recommended that you adjust the `threshold` value with experiments to match your needs.

```ts
import useShakeCallback from 'use-shake-callback';

useShakeCallback(
  () => {
    console.log('🐍 Shook Shook');
  },
  {
    updateInterval: 100,
    threshold: 5,
    onError: (error) => console.log(error),
  }
);
```

- This hooks is **optimized to unsubscribe the sensor event listener** when the app status change to `inactive`(= when the app goes to background). The `appState`, which is required to handle such process, is exported so that you can use throughout your application.

```ts
const { appState } = useShakeCallback(
  () => console.log('🐍 Shook Shook');
  {
    onError: (error) => console.log(error),
    onUnsubscribe: () =>
      console.log('[*] Unsubscribing accelerometer sensor'),
  },
);

console.log(appState) // 'active' or 'inactive'
```

## 👻 Typings

- All typings are exported. Yay! 🎉

```ts
import {ShakeCallback, ShakeConfig} from 'use-shake-callback';
```

### type ShakeCallback

- Type of the callback, which is called when the current device speed(calculated from acceleration) is greater then the provided `threshold`.
- Return type is `void`.

### Parameters

| Name    | Type     | Description                |
| ------- | -------- | -------------------------- |
| `speed` | `number` | Speed of the current shake |

### interface ShakeConfig

- Configuration object of the hook.

### Fields

- All fields are optional and have defaults.

| Name             | Type                                  | Default value | Description                                                                                                                 |
| ---------------- | ------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `updateInterval` | `number`                              | `100`         | Defines the update interval of the accelerometer sensor                                                                     |
| `threshold`      | `number`                              | `5`           | Threshold for detecting shake events; If the current speed is greater than the provided value, the callback will be called. |
| `onError`        | `(error: any) => void` or `undefined` | `undefined`   | Called when error occurred in subscription for accelerometer                                                                |
| `onUnsubscribe`  | `() => void` or `undefined`           | `undefined`   | Called when unsubscribed from the accelerometer sensor                                                                      | -->
