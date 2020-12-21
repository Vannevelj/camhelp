import React, { RefObject } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Navigation, NavigationComponent, NavigationComponentProps } from 'react-native-navigation';
import styles from './styles';

interface Props extends NavigationComponentProps { }

export default class Camera extends NavigationComponent<Props> {
    private cameraRef: RefObject<RNCamera>;

    public constructor(props: Props) {
        super(props);

        this.cameraRef = React.createRef();
    }

    private takePicture = () => {
        console.log('taking picture');
        return this.cameraRef.current?.takePictureAsync({
            pauseAfterCapture: false,
        });
    }

    private takePictures = async () => {
        var first = await this.takePicture();
        var second = await this.takePicture();
        var third = await this.takePicture();

        console.log('all done');
        console.log(first);
        console.log(second);
        console.log(third);

        Navigation.push(this.props.componentId, {
            component: {
                name: 'Picker',
                options: {
                    topBar: {
                        title: {
                            text: 'Picker'
                        }
                    }
                }
            }
        });
    }

    public render() {
        return (
            <View style={styles.container}>
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
