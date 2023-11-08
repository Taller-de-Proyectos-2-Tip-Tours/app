import { LogBox } from "react-native";

export const setupLogsUseCase = () => {
  const ignoreWarns = [
    "EventEmitter.removeListener",
    "Setting a timer for a long period of time",
    "ViewPropTypes will be removed from React Native",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews",
    "Google Sign-In Error",
    "Possible Unhandled Promise Rejection",
  ];

  const ignoreError = ["ViewPropTypes will be removed from React Native"];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  const error = console.error;
  console.error = (...arg) => {
    for (const error of ignoreError) {
      if (arg[0].startsWith(error)) {
        return;
      }
    }
    error(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
  LogBox.ignoreLogs(ignoreError);
};
