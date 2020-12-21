import React from 'react';
import {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

interface Props {
  message: string;
}

export const Notice: FunctionComponent<Props> = ({message}) => (
  <View style={styles.container}>
    <Icon name="info" size={30} color="darkblue" />
    <Text style={styles.text}>{message}</Text>
  </View>
);
