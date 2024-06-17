const path = require('path');

const getAppPath = () => __dirname;

const getRendererPath = () => path.join(getAppPath(), '..', '..', 'src', 'renderer', 'pages');

module.exports = { getAppPath, getRendererPath };