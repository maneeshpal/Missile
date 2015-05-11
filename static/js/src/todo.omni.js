

var isNode = typeof module !== 'undefined' 
  && module.exports 
  && typeof window === 'undefined';
var React = isNode ? require('react/addons') : window.React;


var TodoItem = React.createClass({
  render: function() {
    
    return (
      <div>
        todo item: {this.props.todo}
      </div>
    );
  }
});

var TodoList = React.createClass({
  render: function() {
    var todoNodes = this.props.data.map(function (comment) {
      return (
        <TodoItem todo={comment}>
        </TodoItem>
      );
    });
    return (
      <div className="commentList">
        {todoNodes}
      </div>
    );
  }
});

var TodoApp = React.createClass({
    componentDidMount: function () {
      console.log('component mounted');
    },
    render: function () {
      return (
        <h4>Todo App heading</h4>
        <TodoList data = {this.props.data} />
      )
    }
  });

if(isNode) {
  module.exports.todoApp = TodoApp;
}
else {
  var mountNode = document.getElementById("react-main-mount");
  var data = ['item1', 'item2'];
  React.render(<TodoApp data={data}/>, mountNode); 
}