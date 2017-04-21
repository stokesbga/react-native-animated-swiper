import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { height, width } = Dimensions.get('window');

const Swiper = ({
  bounces,
  children: slides,
  dotsColor,
  dotsColorActive,
  hideDots
}) => {
  const scroll = new Animated.Value(0);
  const position = Animated.divide(scroll, width);

  const colors = [];

  React.Children.map(slides, ({ props: { backgroundColor } }) => {
    if (!backgroundColor)
      throw new Error(
        'All <Swiper /> child components must have a (backgroundColor: string) prop.'
      );

    colors.push(backgroundColor);
  });

  const backgroundColor = position.interpolate({
    inputRange: colors.map((color, i) => i),
    outputRange: colors
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor }]} />
      <Animated.ScrollView
        bounces={bounces || true}
        horizontal
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scroll } } }
        ])}
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        {slides.map((slide, i) => (
          <View key={`swiper-slide-${i}`} style={{ width }}>
            <Animated.View
              style={{
                transform: [
                  {
                    translateX: Animated.multiply(
                      Animated.add(position, -i),
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
      {!hideDots &&
        <View>
          <View style={[styles.dotContainer, { zIndex: 99 }]}>
            {slides.map((slide, i) => (
              <Animated.View
                key={`swiper-dot-active-${i}`}
                style={[
                  styles.dot,
                  {
                    backgroundColor: dotsColorActive || 'rgba(0, 0, 0, 0.75)',
                    opacity: Animated.add(position, 1 - i)
                  }
                ]}
              />
            ))}
          </View>
          <View style={[styles.dotContainer, { zIndex: 98 }]}>
            {slides.map((slide, i) => (
              <Animated.View
                key={`swiper-dot-${i}`}
                style={[
                  styles.dot,
                  {
                    backgroundColor: dotsColor || 'rgba(0, 0, 0, 0.25)'
                  }
                ]}
              />
            ))}
          </View>
        </View>}
    </View>
  );
};

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
    bottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    width
  }
};

export default Swiper;
