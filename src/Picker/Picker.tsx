import React, { PureComponent, RefObject } from 'react';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styles';

interface Props {
    images: string[];
}

export default class Picker extends PureComponent<Props> {
    private carouselRef: RefObject<Carousel<string>>;

    public constructor(props: Props) {
        super(props);

        this.carouselRef = React.createRef();
    }

    private renderItem = (item: { item: string }) => (
        <TouchableOpacity onPress={() => { }}>
            <Text>Select</Text>
        </TouchableOpacity>
    );

    public render() {
        return (
            <View style={styles.container}>
                <Carousel
                    ref={this.carouselRef}
                    data={this.props.images}
                    renderItem={this.renderItem}
                    layout="default"
                />
            </View>
        );
    }
};
