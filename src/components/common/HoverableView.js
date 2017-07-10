import React, { Component } from 'react'
import { View } from 'react-native'

class HoverableView extends Component {
  setStyles = (styles) => {
    this.root.setNativeProps({
      style: styles,
    })
  }

  render() {
    const { onHover, style, ...passThrough } = this.props
    return (
      <View
        ref={(component) => { this.root = component }}
        onMouseEnter={() => this.setStyles(onHover)}
        onMouseLeave={() => this.setStyles(style)}
        style={style}
        {...passThrough}
      />
    )
  }
}

export { HoverableView };
