import {useEffect} from 'react';
import {AppState, AppStateStatus, Platform} from 'react-native';

import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map} from 'rxjs/operators';

// const SHAKE_COUNT_RESET_TIME = 300;

interface IUseShakeProps {
  threshold?: number;
  minimalTimeBetweenTriggers?: number;
  sensorUpdateInterval?: number;
  isTriggerAfterShakes?: boolean;
  resetDependencies?: any[];
}

export const useShake = (
  callback: () => void,
  {
    threshold = 3,
    sensorUpdateInterval = 200,
    minimalTimeBetweenTriggers = 1000,
    isTriggerAfterShakes = true,
    resetDependencies = [],
  }: IUseShakeProps
) => {
  useEffect(() => {
    if (!callback || (__DEV__ && Platform.OS === 'ios')) {
      return;
    }

    let lastUpdate = 0;
    // let shakeCount = 0;
    let shaked = false;

    setUpdateIntervalForType(SensorTypes.accelerometer, sensorUpdateInterval);

    const sensorListener = (accelerometerData: {
      x: number;
      y: number;
      z: number;
      timestamp: number;
    }) => {
      let {x, y, z, timestamp} = accelerometerData;

      let acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

      if (Platform.OS === 'android') {
        acceleration /= 9.80665;
      }

      if (acceleration > threshold) {
        if (lastUpdate + minimalTimeBetweenTriggers > timestamp) {
          return;
        }

        // if (lastUpdate + SHAKE_COUNT_RESET_TIME < timestamp) {
        //   shakeCount = 0;
        // }

        lastUpdate = timestamp;
        // shakeCount++;

        shaked = true;

        if (!isTriggerAfterShakes) {
          callback();
        }
      } else {
        if (shaked) {
          shaked = false;

          if (isTriggerAfterShakes) {
            callback();
          }
        }
      }
    };

    const sensor = accelerometer.pipe(
      map((sensorData) => {
        return sensorData;
      })
    );

    let subscription = sensor.subscribe(sensorListener);

    const onChangeAppState = (nextAppState: AppStateStatus) => {
      subscription.unsubscribe();
      if (nextAppState === 'active') {
        subscription = sensor.subscribe(sensorListener);
      }
    };

    const appStateListener = AppState.addEventListener(
      'change',
      onChangeAppState
    );

    return () => {
      subscription.unsubscribe();
      appStateListener.remove();
    };
  }, [callback, ...resetDependencies]);

  return null;
};
