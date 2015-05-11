

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
        <TodoItem todo={comment}/>
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
  getInitialState: function() {
    return {text:''};
  },
  componentDidMount: function () {
    console.log('component mounted');
  },
  addTodo: function(e) {
     e.preventDefault();
    this.props.data.push(this.state.text);
    this.setState({'text':''});
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function () {
    return (
      <div>
        <h4>Todo App heading {this.props.data.join('-')}</h4>
        <TodoList data={this.props.data} />
        <input type="text" value={this.state.text} onChange={this.onChange}></input>
        <button onClick={this.addTodo}>add todo</button>
      </div>
    );
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