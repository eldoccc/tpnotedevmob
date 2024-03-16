import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './routes/RootStack';
import { Provider } from 'react-redux';
import globalStore from './store/globalStore';
import {PaperProvider} from "react-native-paper";

export default function App() {
  return (
      <PaperProvider>
    <View style={styles.container}>
      <Provider store={globalStore}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    </View>
        </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  }
});


