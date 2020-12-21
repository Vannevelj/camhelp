import React, {RefObject} from 'react';
import Carousel from 'react-native-snap-carousel';
import {Button, View} from 'react-native';
import styles from './styles';
import {
  NavigationComponentProps,
  NavigationComponent,
  Options,
  Navigation,
} from 'react-native-navigation';
import SliderEntry from '../SliderEntry/SliderEntry';
import {sliderWidth, itemWidth} from '../SliderEntry/styles';
import {PermissionsAndroid, Platform} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

export interface Props extends NavigationComponentProps {
  images: string[];
}

interface State {
  selectedIndex: number;
  isSaving: boolean;
}

export default class Picker extends NavigationComponent<Props, State> {
  static options: Options = {
    topBar: {
      visible: false,
    },
  };

  private carouselRef: RefObject<Carousel<string>>;

  public constructor(props: Props) {
    super(props);

    this.carouselRef = React.createRef();
    this.state = {
      selectedIndex: 0,
      isSaving: false,
    };
  }

  private renderItem(data: {item: string; index: number}) {
    return <SliderEntry uri={data.item} even={(data.index + 1) % 2 === 0} />;
  }

  private save = async () => {
    this.setState({isSaving: true});
    if (Platform.OS === 'android' && !(await this.hasAndroidPermission())) {
      return;
    }

    const tag = this.props.images[this.state.selectedIndex];
    await CameraRoll.save(tag);
    this.setState({isSaving: false});

    Navigation.push(this.props.componentId, {
      component: {
        name: 'Camera',
      },
    });
  };

  private hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  public render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={this.carouselRef}
          data={this.props.images}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          firstItem={0}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // containerCustomStyle={styles.slider}
          // contentContainerCustomStyle={styles.sliderContentContainer}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({selectedIndex: index})}
        />

        <Button
          onPress={this.save}
          title="Save"
          color="green"
          accessibilityLabel="Save"
          disabled={this.state.isSaving}
        />
      </View>
    );
  }
}
