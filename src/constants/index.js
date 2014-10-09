var mirror = require('mirrorkey')

module.exports = {
  PayloadSources: mirror(['SERVER_ACTION', 'VIEW_ACTION']),
  ActionTypes: mirror(['TOGGLE_MENU', 'ANIMATE_STRIPS'])
}
