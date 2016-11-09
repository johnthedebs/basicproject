import React from 'react'

import { createDevTools } from 'redux-devtools'

import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import SliderMonitor from 'redux-slider-monitor'

// module.exports = createDevTools(
    // <DockMonitor
        // toggleVisibilityKey = "ctrl-h"
        // changePositionKey   = "ctrl-q"
    // >
        // <LogMonitor theme="tomorrow" />
    // </DockMonitor>
// )

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultPosition="bottom"
    defaultSize={0.15}
  ><SliderMonitor keyboardEnabled /></DockMonitor>
)
