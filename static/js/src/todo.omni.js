
    import React from 'react';
    import immstruct from 'immstruct';
    import Immutable from 'immutable';
    import omniscient from 'omniscient';
    import Router from 'react-router';
    const { Route, RouteHandler, Link } = Router;

    const component = omniscient.withDefaults({
        jsx: true
    });

    const structure = immstruct({
        items: [{
            item: 'first todo item'
        },
        {
            item: 'second todo item'
        }],
        newItemValue: '' 
    });

    const TodoItem = component(function (props) {
        return (
            <div>
                todo item: {props.todo.get('item')}
            </div>
        ); 
    });

    const TodoList = component(function (props) {
        const todoNodes = props.items.map(function (item) {
            return (
                <TodoItem todo = {item} />
            );
        });
        return (
            <div className="commentList">
                {todoNodes}
            </div>
        );
    });

    const mixins = {
        changeHandler (e) {
            this.props.value.update(function (currentSearch) {
                return e.currentTarget.value;
            });
        },
        addTodo (e) {
            const newItem = Immutable.fromJS({ item: this.props.data.get('newItemValue') });
            const newList = this.props.data.get('items');
            const combined = newList.concat([newItem]);
            this.props.data.set('items', combined);
            this.props.data.set('newItemValue','');
        }
    };

    const TodoBox = component('TodoBox', mixins, function (props) {
        return (
            <input type="text" value={props.value.deref()} 
            onChange={this.changeHandler}></input>
        );
    });


    const TodoApp = component('TodoApp', mixins, function ({ data : d}) {
        return (
            <div>
                <h4>Todo App heading </h4>
                <TodoList items = {d.cursor('items')} />
                <TodoBox value =  {d.cursor('newItemValue')} />
                <button onClick = {this.addTodo} > add todo </button>
                
            </div>
        );
    });

    const User = component('User', function ({ userId }) {
        return (
            <div style={{height: '400px', backgroundColor: '#ccc'}}>
                userid is {userid}
            </div>
        );
    });

    const About = component('About', function ({ userid }) {
        return (
            <div>
                ABOUT userid is 
            </div>
        );
    });

    const AboutContainer = component('AboutContainer', function ({ userid }) {
        return (
            <div style={{height: '400px', backgroundColor: '#F5f5f5'}}>
                <RouteHandler />
                &nbsp;<Link to="todo">Todo</Link>
            </div>
        );
    });

    function bindProps (Comp, props) {
        return component(function (extraProps) {
            return (
                <Comp {...props} {...extraProps} />
            );
        });
    };

    const TodoAppWithProps = bindProps(TodoApp, { data: structure.cursor() });

    const App = component({
        shouldComponentUpdate () {
            return true;
        }
    },function () {
        return (
            <div>
                <Link to="about">About</Link>
                <Link to="todo">Todo</Link>
                <RouteHandler />
            </div>
        );
    });

    const routes = (
        <Route path="/" handler={App}>
            <Route name="todo" handler={TodoAppWithProps} />
            <Route name="about" path=":userid" handler={AboutContainer}/>
        </Route>
    );

    function render () {
        Router.run(routes, function (Handler) {
            React.render(<Handler />, document.getElementById('react-main-mount'));
        });
    }

    render();

    structure.on('swap', render);
