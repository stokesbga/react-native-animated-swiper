import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { height, width } = Dimensions.get('window');

class Swiper extends Component {
  scroll = new Animated.Value(0);
  position = Animated.divide(this.scroll, width);

  componentWillMount() {
    const colors = [];

    React.Children.map(
      this.props.children,
      ({ props: { backgroundColor } }) => {
        if (!backgroundColor)
          throw new Error(
            'All <Swiper /> child components must have a (backgroundColor: string) prop.'
          );

        colors.push(backgroundColor);
      }
    );

    this.backgroundColor = this.position.interpolate({
      inputRange: colors.map((color, i) => i),
      outputRange: colors
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: this.backgroundColor }
          ]}
        />
        <Animated.ScrollView
          bounces={this.props.bounces || true}
          horizontal
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scroll } } }
          ])}
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          {this.props.children.map((slide, i) => (
            <View key={`swiper-slide-${i}`} style={{ width }}>
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: Animated.multiply(
                        Animated.add(this.position, -i),
                        -200
                      )
                    }
                  ],
                  width
                }}>
                <Animated.View style={{ height }}>
                  {slide}
                </Animated.View>
              </Animated.View>
            </View>
          ))}
        </Animated.ScrollView>
        {this.props.dots &&
          <View>
            <View style={[styles.dotContainer, { zIndex: 99 }]}>
              {this.props.children.map((slide, i) => (
                <Animated.View
                  key={`swiper-dot-active-${i}`}
                  style={[
                    styles.dot,
                    this.props.dotStyleActive,
                    {
                      backgroundColor: this.props.dotsColorActive ||
                        'rgba(0, 0, 0, 0.75)',
                      opacity: Animated.add(this.position, 1 - i)
                    }
                  ]}
                />
              ))}
            </View>
            <View style={[styles.dotContainer, { zIndex: 98 }]}>
              {this.props.children.map((slide, i) => (
                <Animated.View
                  key={`swiper-dot-${i}`}
                  style={[
                    styles.dot,
                    this.props.dotStyle,
                    {
                      backgroundColor: this.props.dotsColor ||
                        'rgba(0, 0, 0, 0.25)'
                    }
                  ]}
                />
              ))}
            </View>
            {this.props.shadow &&
              <View
                style={[
                  styles.shadowContainer,
                  styles.shadow,
                  this.props.shadowStyle
                ]}
              />}
          </View>}
      </View>
    );
  }
}

const styles = {
  dot: {
    borderRadius: 4,
    height: 8,
    marginLeft: 4,
    marginRight: 4,
    width: 8
  },
  dotContainer: {
    alignItems: 'center',
    bottom: 29,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    width
  },
  shadowContainer: {
    bottom: 0,
    height: 70,
    position: 'absolute',
    width,
    zIndex: 97
  },
  shadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.125,
    shadowRadius: 8
  }
};

export default Swiper;
