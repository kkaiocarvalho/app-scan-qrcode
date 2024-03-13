import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Provider as PaperProvider, Modal, Portal } from 'react-native-paper';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

export default function ScanScreen() {

- Aqui, estamos importando as bibliotecas necessárias para criar a tela de digitalização (ScanScreen) em um aplicativo React Native. Isso inclui coisas como React, componentes específicos do React Native, como View e Text, e também componentes específicos para digitalização de códigos de barras, como BarCodeScanner, fornecido pela biblioteca Expo.



  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false)

- Aqui, estamos usando React Hooks, mais especificamente useState, para definir estados locais. hasPermission é usado para controlar se a permissão da câmera foi concedida. scanned controla se um código de barras foi escaneado com sucesso. visible controla a visibilidade de um modal. showModal e hideModal são funções para mostrar e esconder o modal, respectivamente.



  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

- Este trecho utiliza o useEffect, que é uma função de gancho (hook) do React que permite realizar efeitos colaterais em componentes funcionais. Aqui, estamos utilizando-o para solicitar permissão para acessar a câmera quando o componente for montado. A função requestPermissionsAsync() retorna uma Promise que resolve em um objeto contendo o status da permissão. Dependendo do status, atualizamos o estado de hasPermission.



  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    alert(`Bar code: ${type} Data: ${data}`);
  };

- Esta função é chamada sempre que um código de barras é escaneado com sucesso. Ela atualiza o estado scanned para true e mostra um alerta com as informações do código de barras escaneado.



  const handleScanAgain = () => {
    setScanned(false);
  };

- Esta função é chamada quando o usuário decide escanear novamente. Ela redefine o estado scanned para false.



  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

- Aqui, verificamos o estado de hasPermission. Se ainda estiver null, significa que a permissão ainda está sendo solicitada, então exibimos uma mensagem indicando isso. Se hasPermission for false, significa que o acesso à câmera foi negado, então exibimos uma mensagem indicando isso.



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

- Finalmente, no retorno da função ScanScreen, estamos renderizando o componente. Ele contém um BarCodeScanner que ocupa toda a tela (StyleSheet.absoluteFillObject). Dependendo do estado de scanned, também renderizamos uma sobreposição (overlay) com uma mensagem indicando que está escaneando e um botão para escanear novamente.



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

- Aqui, estamos definindo estilos para os componentes usando StyleSheet.create(). Estes estilos são aplicados aos elementos renderizados na tela. Por exemplo, definimos um estilo para o container principal (container), a sobreposição (overlay), a mensagem de escaneamento (scanMessage), o botão de escanear novamente (buttonScanAgain), e o texto do botão (textButton). Esses estilos determinam a aparência visual dos elementos na tela.