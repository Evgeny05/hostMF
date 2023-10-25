/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';

import {Federated} from '@callstack/repack/client';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {Counter} from './src/components/Counter';

const App1 = React.lazy(() => Federated.importModule('rnminiappone', './App'));

// const App2 = React.lazy(() => Federated.importModule('rnminiappone2', './App'));

function App(): JSX.Element {
  const [visibleApp, setVisibleApp] = useState<string>('');

  const renderBackToHome = () => {
    if (visibleApp) {
      return (
        <View>
          <Button title="<- Back To Home" onPress={() => setVisibleApp('')} />
        </View>
      );
    }
  };

  const renderRelevantApp = () => {
    switch (visibleApp) {
      case 'app1':
        return (
          <View>
            <React.Suspense fallback={<Text>Loading app1...</Text>}>
              <App1 />
            </React.Suspense>
          </View>
        );

      // case 'app2':
      //   return (
      //     <View>
      //       <React.Suspense fallback={<Text>Loading app1...</Text>}>
      //         <App2 />
      //       </React.Suspense>
      //     </View>
      //   );

      default:
        return (
          <SafeAreaView>
            <View>
              <Button title="App One" onPress={() => setVisibleApp('app1')} />
              <Button title="App Two" onPress={() => setVisibleApp('app2')} />
            </View>
          </SafeAreaView>
        );
    }
  };

  return (
    <Provider store={store}>
      <View>
        {renderBackToHome()}
        <Counter />
        {renderRelevantApp()}
      </View>
    </Provider>
  );
}

export default App;
