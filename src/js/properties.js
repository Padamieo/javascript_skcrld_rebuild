var npmProperties = require('../../package.json');

module.exports ={
  title: 'Phaser JS Boilerplate',
  description: npmProperties.description,
  port: 3017,
  liveReloadPort: 3018,
  mute: false,
  showStats: true,
  size:{
    x: 600,
    y: 800
  },
  analyticsId: 'UA-50892214-2'
};
