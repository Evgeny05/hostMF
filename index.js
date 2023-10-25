/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Federated, Script, ScriptManager} from '@callstack/repack/client';

const resolveURL = Federated.createURLResolver({
  containers: {
    rnminiappone: 'http://10.0.2.2:9000/[name][ext]',
    // rnminiappone:
    //   'https://github.com/Evgeny05/MiniAppMF/releases/download/1.0.0/[name][ext]',
    // rnminiappone2:
    //   'https://github.com/Evgeny05/MiniAppMF2/releases/download/1.0.0/[name][ext]',
    // rnminiappone: 'http://localhost:9000/[name][ext]',
    // rnminiappone: 'http://127.0.0.1:8082/build/outputs/android/[name][ext]',
    // rnminiappone: 'http://localhost:8082/build/output/android/[name][ext]',
    // rnminiappone: 'http://192.168.88.212:8082/build/output/android/[name][ext]',
    // rnminiappone:
    //   'http://10.0.2.2:8082/build/outputs/android/remotes/[name][ext]',
  },
});

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
    // verifyScriptSignature: __DEV__ ? 'off' : 'strict',
  };
});

AppRegistry.registerComponent(appName, () => App);
