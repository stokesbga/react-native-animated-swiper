# react-native-animated-swiper
<img src="https://raw.githubusercontent.com/sonaye/react-native-animated-swiper/master/demo.gif" width="400">

# Installation
`yarn add react-native-animated-swiper`

# Usage
```javascript
<Swiper
  bounces={true}                        // default = true
  dotsColor="rgba(0, 0, 0, 0.25)"       // default = 'rgba(0, 0, 0, 0.25)'
  dotsColorActive="rgba(0, 0, 0, 0.75)" // default = 'rgba(0, 0, 0, 0.75)'
  hideDots={false}>                     // default = false
  <Component />
  <Component />
  <Component />
</Swiper>
```

## Example
```javascript
import React from 'react';
import { Text, View } from 'react-native';

import Swiper from 'react-native-animated-swiper';

// all <Swiper /> child components must have a (backgroundColor: string) prop
const Example = () => (
  <Swiper
    dotsColor="rgba(255, 255, 255, 0.25)"
    dotsColorActive="rgba(255, 255, 255, 0.75)">
    <Slide backgroundColor="#4285f4" title="Lorem" />
    <Slide backgroundColor="#0f9d58" title="ipsum" />
    <Slide backgroundColor="#f4b400" title="dolor" />
    <Slide backgroundColor="#db4437" title="sit" />
  </Swiper>
);

const Slide = ({ title }) => (
  <View
    style={{
      alignItems: 'center',
      backgroundColor: 'transparent', // must be transparent
      flex: 1,
      justifyContent: 'center'
    }}>
    <Text style={{ color: '#fff', fontSize: 48 }}>
      {title}
    </Text>
  </View>
);

export default Example;
```
