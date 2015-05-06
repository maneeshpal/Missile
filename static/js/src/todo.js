var React = require('react/addons');

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

/* Module.exports instead of normal dom mounting */
module.exports.todoApp = TodoApp;  
/* Normal mounting happens inside of /main.js and is bundled with browerify */