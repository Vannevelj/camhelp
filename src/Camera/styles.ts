import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  bottomRow: {
    marginTop: 'auto',
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  takePicButton: {
    alignSelf: 'center',
  },
  flipCameraButton: {
    alignSelf: 'center',
  },
  timer: {
    alignSelf: 'center',
    marginTop: '50%',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 4,
    padding: 40,
  },
  timerText: {
    fontSize: 80,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default styles;
