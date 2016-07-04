var npmProperties = require('../../package.json');

module.exports ={
  title: 'Rainbow Kitty',
  description: npmProperties.description,
  port: 3017,
  liveReloadPort: 3018,
  showStats: false,
  size:{
    x: 405,
    y: 720
  }
};
