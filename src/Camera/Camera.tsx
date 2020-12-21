import React, { RefObject } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Navigation, NavigationComponent, NavigationComponentProps, Options } from 'react-native-navigation';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Props as PickerProps } from '../Picker/Picker';

interface Props extends NavigationComponentProps { }
interface State {
    type: 'back' | 'front';
    countdown?: number;
}

export default class Camera extends NavigationComponent<Props, State> {
    static options: Options = {
        topBar: {
            visible: false,
        },
    };

    private cameraRef: RefObject<RNCamera>;
    private timer?: NodeJS.Timeout;

    public constructor(props: Props) {
        super(props);

        this.cameraRef = React.createRef();
        this.state = {
            type: 'back'
        }
    }

    private flip = () => {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back'
        });
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
                passProps: {
                    images: [first?.uri, second?.uri, third?.uri]
                }
            }
        });
    }

    private startTimer = () => {
        this.setState({ countdown: 5 });
        this.timer = setInterval(this.countDown, 1000);
    }

    private countDown = async () => {
        console.log(`counting down: ${this.state.countdown}`);
        if (this.state.countdown === undefined || this.timer === undefined) {
            return;
        }

        if (this.state.countdown === 1) {
            console.log('clearing interval')
            clearInterval(this.timer);
            this.timer === undefined;
            this.setState({
                countdown: undefined
            });
            console.log('taking pics');
            await this.takePictures();

            return;
        }

        this.setState({
            countdown: this.state.countdown - 1
        });
    }

    private renderTimer = () => {
        if (!this.state.countdown) {
            return null;
        }

        return (
            <View style={styles.timer}>
                <Text style={styles.timerText}>{this.state.countdown.toString()}</Text>
            </View>
        )
    }

    private renderControls = () => {
        if (this.state.countdown) {
            return null;
        }

        return (
            <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.flipCameraButton} onPressIn={this.flip}>
                    <Icon name="flip-camera-ios" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.takePicButton} onPressIn={this.startTimer}>
                    <Icon name="photo-camera" size={80} color="red" />
                </TouchableOpacity>
            </View>
        )
    }

    public render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={this.cameraRef}
                    style={{
                        flex: 1,
                    }}
                    type={this.state.type}
                    flashMode={'auto'}
                    autoFocus={'on'}
                >
                    {this.renderTimer()}
                    {this.renderControls()}
                </RNCamera>
            </View>
        );
    }
};
