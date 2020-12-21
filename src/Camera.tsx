import React, { PureComponent, RefObject } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
//@ts-expect-error
import { CameraKitCamera } from 'react-native-camera-kit';
import styles from './styles';

interface Props { }

export default class Camera extends PureComponent<Props> {
    // private cameraRef: RefObject<RNCamera>;
    private cameraRef: RefObject<CameraKitCamera>;

    public constructor(props: Props) {
        super(props);

        this.cameraRef = React.createRef();
    }

    private takePicture = () => {
        console.log('taking picture');
        // return this.cameraRef.current?.capture();
        return this.cameraRef.current?.takePictureAsync({
            pauseAfterCapture: false,
        });
    }

    private takePictures = async () => {
        var first = await this.takePicture();
        var second = await this.takePicture();
        var third = await this.takePicture();

        // const pictures = await Promise.all([first, second, third]);
        console.log('all done');
        console.log(first);
        console.log(second);
        console.log(third);
    }

    public render() {
        return (
            <View style={styles.container}>
                {/* <CameraKitCamera
                    ref={this.cameraRef}
                    type={'back'} // front/back(default)
                    style={{ flex: 1 }}
                    cameraOptions={{
                        flashMode: 'auto', // on/off/auto(default)
                        focusMode: 'on', // off/on(default)
                        zoomMode: 'on', // off/on(default)
                        ratioOverlay: '1:1', // optional
                        ratioOverlayColor: '#00000077', // optional
                    }}
                    resetFocusTimeout={0} // optional
                    resetFocusWhenMotionDetected={true} // optional
                    saveToCameraRoll={false} // optional
                />

                <View style={styles.bottomRow}>
                    <TouchableOpacity style={styles.takePicButton} onPressIn={this.takePictures}>
                        <Text>Click</Text>
                    </TouchableOpacity>
                </View> */}

                <RNCamera
                    ref={this.cameraRef}
                    style={{
                        flex: 1,
                    }}
                    type={'back'}
                    flashMode={'auto'}
                    autoFocus={'on'}
                >
                    <View style={styles.bottomRow}>
                        <TouchableOpacity style={styles.takePicButton} onPressIn={this.takePictures}>
                            <Text>Click</Text>
                        </TouchableOpacity>
                    </View>
                </RNCamera>
            </View>
        );
    }
};
