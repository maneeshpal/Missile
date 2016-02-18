
import React from 'react';
import ReactDom from 'react-dom';
import immstruct from 'immstruct';
import Immutable from 'immutable';
import omniscient from 'omniscient';
import { Router, Route, Redirect, IndexRoute, Link, useRouterHistory  } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createHistory } from 'history';

const browserHistory = useRouterHistory(createHistory)({ basename: '/routertest' })

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

const Page1Component = component(function () {
    return (
        <div className="container le"><h1>I am Page1</h1><Link to="/page2">page2</Link></div>
    )
});

const Page2Component = component(function () {
    return (
        <div className="container ri"><h1>I am Page2</h1><Link to="/">page1</Link></div>
    )
});


const App = component({
    getInitialState () {
        return {
            cursor: structure.cursor()
        }
    },

    componentDidMount() {
        console.log('mounter aoo');
    },

    componentWillMount () {
        structure.on('swap', this.onSwap);
    },

    componentWillUnmount () {
        structure.off('swap', this.onSwap);
    },
    
    onSwap (oldSt, newSt, keyPath) {
        console.info('Updated at key path ', keyPath);
        this.setState({ cursor: structure.cursor() });
    }

}, function () {
    let { children } = this.props;
    children = React.Children.map(children, c => {
        const props = Object.assign({}, this.state, { key: Math.floor(Math.random() * 100) })
        return React.cloneElement(c, props);
    });
    return (
        <ReactCSSTransitionGroup 
            component="div"
            transitionName="slider"
            className="app"
            transitionAppear={true}
            transitionLeaveTimeout={500}
            transitionEnterTimeout={500}
            transitionAppearTimeout={500}>
            {children}
        </ReactCSSTransitionGroup>
    );
});

const NotFound = component(() => <h2>Not found</h2>);

ReactDom.render (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute
                component={Page1Component} />
            <Route
                path="page2"
                component={Page2Component} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>,
    document.getElementById('react-main-mount')
);