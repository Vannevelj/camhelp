import React, {PureComponent} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

interface Props {
  uri: string;
  even: boolean;
}

export default class SliderEntry extends PureComponent<Props> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const {even, uri} = this.props;
    return (
      <TouchableOpacity activeOpacity={1} style={styles.slideInnerContainer}>
        <View style={styles.shadow} />
        <View
          style={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}>
          <Image source={{uri}} style={styles.image} />
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
