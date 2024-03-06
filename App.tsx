import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const webAppUri = 'http://192.168.1.68:5173/' // your web app uri, depends if it's local or hosted

export default function App() {
  return (
    <View style={styles.container}>
      <WebView style={styles.webview} source={{ uri: webAppUri }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  webview: {
    display: 'flex',
    width: '100%',
    height: '100%',
  }
});
