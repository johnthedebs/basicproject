React = require "react"

{ createDevTools } = require "redux-devtools"

LogMonitor    = require("redux-devtools-log-monitor").default
DockMonitor   = require("redux-devtools-dock-monitor").default
SliderMonitor = require("redux-slider-monitor")

#module.exports = createDevTools(
    #<DockMonitor
        #toggleVisibilityKey = "ctrl-h"
        #changePositionKey   = "ctrl-q"
    #>
        #<LogMonitor theme="tomorrow" />
    #</DockMonitor>
#)

module.exports = createDevTools(
    <DockMonitor
        toggleVisibilityKey = "ctrl-h"
        changePositionKey   = "ctrl-q"
        defaultPosition     = "bottom"
        defaultSize         = {0.15}
    >
        <SliderMonitor keyboardEnabled />
    </DockMonitor>
)
