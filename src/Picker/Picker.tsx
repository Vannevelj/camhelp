import React, {RefObject} from 'react';
import Carousel from 'react-native-snap-carousel';
import {Text, TouchableOpacity, View} from 'react-native';
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
import {Notice} from '../Notice/Notice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenOrientation from 'react-native-orientation-locker';
import * as Sentry from '@sentry/react-native';
import Trans from '../TextHelper';
import InAppReview from 'react-native-in-app-review';
import Storage from '../StorageHelper';

export interface Props extends NavigationComponentProps {
  images: string[];
}

interface State {
  selectedIndex: number;
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
    };
  }

  public async componentDidMount() {
    ScreenOrientation.lockToPortrait();
  }

  public componentWillUnmount() {
    ScreenOrientation.unlockAllOrientations();
  }

  private renderItem(data: {item: string; index: number}) {
    return <SliderEntry uri={data.item} even={(data.index + 1) % 2 === 0} />;
  }

  private goToCamera = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Camera',
      },
    });
  };

  private save = async () => {
    if (Platform.OS === 'android' && !(await this.hasAndroidPermission())) {
      return;
    }

    const picturesTakenStorage = await Storage.get('pictures-taken');
    let picturesTaken = 0;
    if (picturesTakenStorage) {
      picturesTaken = parseInt(picturesTakenStorage, 10);
    }

    const tag = this.props.images[this.state.selectedIndex];
    try {
      await CameraRoll.save(tag);
      await Storage.set('pictures-taken', (++picturesTaken).toString());
      this.goToCamera();
      if (picturesTaken >= 5 && InAppReview.isAvailable()) {
        const hasPreviouslyRequestedReview = await Storage.get(
          'review-requested',
        );
        if (!hasPreviouslyRequestedReview) {
          console.log('Requesting app review');
          InAppReview.RequestInAppReview();
          await Storage.set('review-requested', 'true');
        }
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  private hasAndroidPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    } catch (err) {
      Sentry.captureException(err);
      return false;
    }
  };

  public render() {
    return (
      <View style={styles.container}>
        <View>
          <Notice message={Trans.t('picker.notice')} />
          <Carousel
            ref={this.carouselRef}
            data={this.props.images}
            renderItem={this.renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            firstItem={0}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            containerCustomStyle={styles.carouselContainer}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={4000}
            onSnapToItem={(index) => this.setState({selectedIndex: index})}
          />
        </View>

        <TouchableOpacity
          onPress={this.save}
          style={styles.saveButtonContainer}>
          <Text style={styles.saveButtonText}>{Trans.t('picker.save')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.goToCamera}
          style={styles.retryButtonContainer}>
          <Icon name="autorenew" size={30} color="red" />
          <Text style={styles.retryButtonText}>{Trans.t('picker.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
