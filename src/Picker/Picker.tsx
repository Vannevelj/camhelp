import React, { RefObject } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View } from 'react-native';
import styles from './styles';
import { NavigationComponentProps, NavigationComponent, Options } from 'react-native-navigation';
import SliderEntry from './SliderEntry';
import { sliderWidth, itemWidth } from './SliderEntry.styles';

export interface Props extends NavigationComponentProps {
    images: string[];
}

interface State {
    selectedIndex: number;
}

export default class Picker extends NavigationComponent<Props, State> {
    static options: Options = {
        topBar: {
            visible: false
        },
    };

    private carouselRef: RefObject<Carousel<string>>;

    public constructor(props: Props) {
        super(props);

        this.carouselRef = React.createRef();
        this.state = {
            selectedIndex: 0
        }
    }

    private renderItem(data: { item: string, index: number }) {
        return (
            <SliderEntry
                uri={data.item}
                even={(data.index + 1) % 2 === 0}
            />
        );
    }

    private save = () => {
        console.log('saving image');
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
                    firstItem={0}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    // containerCustomStyle={styles.slider}
                    // contentContainerCustomStyle={styles.sliderContentContainer}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ selectedIndex: index })}
                />

                <Button
                    onPress={this.save}
                    title="Save"
                    color="green"
                    accessibilityLabel="Save"
                />
            </View>
        );
    }
};
