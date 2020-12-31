import React from 'react';
import {FunctionComponent} from 'react';
import {Text} from 'react-native';
import styles from './styles';
import overlay from './loader.json';
import Trans from '../TextHelper';
//@ts-expect-error
import AnimatedLoader from 'react-native-animated-loader';

interface Props {
  visible: boolean;
}

// Animation source: https://lottiefiles.com/8447-loader-animation
const WaitingSpinner: FunctionComponent<Props> = ({visible}) => (
  <>
    {visible && (
      <>
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={overlay}
          animationStyle={styles.overlay}
          speed={0.75}>
          <Text style={styles.message}>
            {Trans.t('waiting-spinner.message')}
          </Text>
        </AnimatedLoader>
      </>
    )}
  </>
);

export default WaitingSpinner;
