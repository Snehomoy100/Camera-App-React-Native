import React, {useState} from "react";

import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';

import { RNCamera } from "react-native-camera";

const PendingView = () => {
  return(
    <View style={styles.pendingViewContainer}>
        <Text style={{fontSize: 30, color: "red"}}>Loading...</Text>
    </View>
  )
}



const App = () => {

  const [image, setImage] = useState(null);


  const takePicture = async(camera) => {
    try {
      const options = {quality: 0.9, base64: false} // for the image quality & enoding
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)
    } catch (error) {
      console.warn(error);
    }
  }



  return(
    <>
      <View style={styles.container}>
        {image ? ( // conditional rendering using ternary operators
          <View style={styles.preview}>
            <Text style={styles.banner}>Here is your new picture</Text>
            <Image style={styles.clicked} source={{uri: image, width: "100%", height: "80%"}}></Image>
            <Button
              title="Click new Image"
              onPress={() => {
                return(
                  setImage(null)
                )
              }}
            >
            </Button>
          </View>
             // if the image is already clicked, we've to load that from state
        ) : (
          <RNCamera // if the image isn't present & we've to capture that
          style={styles.preview}
          type={RNCamera.Constants.Type.back} // for use up the back camera. Front camera can also be used
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on} // for turning on the flash light
          androidCameraPermissionOptions={{ // for taking permission from the user
            title: "Permission to use Camera",
            message: "Longer text to use Camera",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission to use Audio",
            message: "Longer text to use Audio",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }}
          >
            {({camera, status}) => {
              if(status !== "READY") return <PendingView />
              return(
                <View
                  style={{
                    flex: 0,
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <TouchableOpacity
                    style={styles.capture}
                    onPress={() => takePicture(camera)}
                  >
                    <Text>SNAP</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          </RNCamera>
        )}
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  pendingViewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#0A79DF"
  },
  preview: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  capture: { // these are immutable & opeque
    flex: 0,
    backgroundColor: "orange",
    padding: 20,
    alignSelf: "center"
  },
  banner: {
    backgroundColor: "#3498DB",
    color: "#FFFFFF",
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 25
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150
  }

  // TODO: add up some shadow effect on the clicked key 
});


export default App;