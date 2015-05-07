

var isNode = typeof module !== 'undefined' 
  && module.exports 
  && typeof window === 'undefined';
var React = isNode ? require('react/addons') : window.React;

var TodoApp = React.createClass({
    componentDidMount: function () {
      console.log('component mounted');
    },
    render: function () {
      return (
        <div>
          Maneesh
        </div>
      )
    }
  });

if(isNode) {
  module.exports.todoApp = TodoApp;  
}
else {
  var mountNode = document.getElementById("react-main-mount");

  React.render(<TodoApp/>, mountNode); 
}