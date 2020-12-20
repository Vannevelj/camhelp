import React, { PureComponent, RefObject } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './styles';

interface Props { }

export default class Camera extends PureComponent<Props> {
    private cameraRef: RefObject<RNCamera>;

    public constructor(props: Props) {
        super(props);

        this.cameraRef = React.createRef();
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
                        <TouchableOpacity style={styles.takePicButton}>
                            <Text>Click</Text>
                        </TouchableOpacity>
                    </View>
                </RNCamera>
            </View>
        );
    }
};
