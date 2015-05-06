var React = require('react/addons');
var todoApp = React.createFactory(require('./public/js/todo').todoApp);

var mountNode = document.getElementById("react-main-mount");

React.renderComponent(new todoApp({}), mountNode);