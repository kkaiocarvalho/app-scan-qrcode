import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Provider as PaperProvider, Modal, Portal } from 'react-native-paper';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    alert(`Bar code: ${type} Data: ${data}`);
  };

  const handleScanAgain = () => {
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.overlay}>
          <Text style={styles.scanMessage}>Scanning...</Text>
          <Button style={styles.buttonScanAgain} onPress={handleScanAgain}>
            <Text style={styles.textButton}>Scan Again</Text></Button>
        </View>
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: -1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanMessage: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    marginBottom: 70,
    borderRadius: 10
  },
  buttonScanAgain: {
    backgroundColor: "green",
    color: "black",
    borderRadius: 5
  },
  textButton: {
    color: 'white',
    fontSize: 20
  }
});
