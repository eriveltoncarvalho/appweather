import React from 'react';
import { View, StatusBar, Text } from 'react-native';

import Dashboard from './../src/pages/Dashboard';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Dashboard />
    </View>
  );
};

export default App;
