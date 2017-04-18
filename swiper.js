import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { height, width } = Dimensions.get('window');

const Swiper = ({ bounces, dotsColor, children: slides, hideDots }) => {
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
        <View
          style={{
            alignItems: 'center',
            bottom: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 99,
            width
          }}>
          {slides.map((slide, i) => (
            <Animated.View
              key={`swiper-dot-${i}`}
              style={{
                backgroundColor: dotsColor || 'rgba(0, 0, 0, 0.25)',
                borderRadius: 4,
                height: 8,
                marginLeft: 4,
                marginRight: 4,
                opacity: Animated.add(position, 1 - i),
                width: 8
              }}
            />
          ))}
        </View>}
    </View>
  );
};

export default Swiper;
