import React, { RefObject } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View } from 'react-native';
import styles from './styles';
import { NavigationComponentProps, NavigationComponent } from 'react-native-navigation';
import SliderEntry from './SliderEntry';
import { sliderWidth, itemWidth } from './SliderEntry.styles';

export interface Props extends NavigationComponentProps {
    images: string[];
}

export default class Picker extends NavigationComponent<Props> {
    private carouselRef: RefObject<Carousel<string>>;

    public constructor(props: Props) {
        super(props);

        this.carouselRef = React.createRef();
    }

    private renderItem(data: { item: string, index: number }) {
        return (
            <SliderEntry
                uri={data.item}
                even={(data.index + 1) % 2 === 0}
            />
        );
    }

    public render() {
        return (
            <View style={styles.container}>
                <Carousel
                    ref={this.carouselRef}
                    data={this.props.images}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    firstItem={1}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                />
            </View>
        );
    }
};
