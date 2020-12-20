import React, { useRef } from 'react';
import { RNCamera } from 'react-native-camera';

const Camera = () => {
    const cameraRef = useRef(null);
    console.log('rendering camera!')

    return (
        <>
            <RNCamera
                ref={cameraRef}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                type={'back'}
                flashMode={'auto'}
                autoFocus={'on'}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
            </RNCamera>
        </>
    );
};

export default Camera;
