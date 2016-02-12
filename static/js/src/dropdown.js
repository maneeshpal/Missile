
import React from 'react';
import immstruct from 'immstruct';
import Immutable from 'immutable';
import omniscient from 'omniscient';
import Router from 'react-router';
const { Route, RouteHandler, Link } = Router;

const { PropTypes, cloneElement } = React;

const component = omniscient.withDefaults({
    jsx: true
});

function objectExcept (obj, ...keysNotToCopy) {
    const newObj = {};
    Object.keys(obj)
        .filter(k => keysNotToCopy.indexOf(k) === -1)
        .forEach(k => newObj[k] = obj[k]);
    return newObj;
}

const structure = immstruct({
    items: [{
        label: '2012 Camry',
        href: 'http://www.google.com'
    }]
});

const Trigger = component(function ({ toggle, isOpen, children }) {
    return (
        <div onClick={toggle} className="trigger">
            {children}
        </div>
    );
});

const StaticOption = component(function ({ children, close }) {
    return <li onClick={close}>{children}</li>;
});

const ListItemOption = component(function ({ value, label, onOptionSelect }) {
    const propsToPass = objectExcept(this.props, 'onOptionSelect');

    return (
        <li value={value} onClick={(ev) => onOptionSelect(ev, propsToPass)}>
            {label}
        </li>
    );
});

const Options = component(function ({ isOpen, close, onOptionSelect, children, className }) {
    const optionsClass = `options ${isOpen ? 'is-open': ''}`;

    const options = React.Children.map(children, (child) => cloneElement(child, { close, onOptionSelect }));

    return (
        <ul className={optionsClass}>
            {options}
        </ul>
    );
});

const Dropdown = component({
    getInitialState () {
        return {
            isOpen: false
        }
    },

    close () {
        this.setState({isOpen : false});
        console.log('closed the dropdown');
    },

    toggle () {
        this.setState({isOpen : !this.state.isOpen});
    },

    selectedOption (ev, listItemProps) {
        this.close();
        console.log('selected', ...listItemProps);
    }
}, function ({ data, className, children: [trigger, options] }) {
    //Here im assuming that trigger is the first child, for proof of concept
    
    const triggerWithProps = cloneElement(trigger, {
        close: this.close,
        toggle: this.toggle,
        isOpen: this.state.isOpen
    });

    const optionsWithProps = cloneElement(options, {
        onOptionSelect : this.selectedOption,
        isOpen: this.state.isOpen,
        close: this.close
    });

    return (
        <div className="dropdown">
            {triggerWithProps}
            {optionsWithProps}
        </div>
    );
});

const UserActionsDropDown = component({
    onClick (ev) {
        console.log('clicked Book Shipment button');
    } 
}, function ({ userActions }) {
    let items = userActions.toList().map((option) =>
        <StaticOption>
            <a href={option.get('href')}>
                {option.get('label')}
            </a>
        </StaticOption>
    );

    items = items.push(
        <StaticOption>
            <button onClick={this.onClick}>Book Shipment</button>
        </StaticOption>
    );
    
    return (
        <Dropdown>
            <Trigger>
                <div>Select users actions</div>
            </Trigger>
            <Options>{items}</Options>
        </Dropdown>
    );
});

let rerendercounter = 0;
const CounterMessage = component(function ({ renderCounts }) {
    return (
        <div>Congrats, you won ${renderCounts()}, I re-rendered { rerendercounter++ } times</div>
    );
});

const CounterIncrementor = component({
    getInitialState () {
        return ({
            amountWon: 1000,
            drawCounter : 0
        })
    },

    incrementCounter () {
        this.setState({
            amountWon : this.state.amountWon + 100 
        });
    },

    draw () {
        this.setState({drawCounter : this.state.drawCounter + 1 });
    },
    // Since this func is a mixin, it's reference does on change upon rerender. So, if you pass this func as
    // callback to <CounterMessage />, it DOESNOT renrender ever, 
    // unless there is another prop that changes, triggering the renrender
    renderCounts () {
        return this.state.amountWon;
    }
}, function () {
    // Since this func is declared on every render, <CounterMessage /> component is FORCED to rerender everytime
    // Bad bad
    const renderCounts = () => {
        return this.state.amountWon;
    }

    return (
        <div>
            <h3>Anti pattern: using callbacks for communication between owner and ownee</h3>
            <h4>Lottery, drawn {this.state.drawCounter} times </h4>
            <CounterMessage renderCounts={this.renderCounts} />
            <button onClick={this.incrementCounter}>Click to Win {this.state.amountWon}</button> &nbsp;&nbsp;
            <button onClick={this.draw}>Click to draw</button>
        </div>
    );
});

const App = component(function ({ data }) {

    return (
        <div>
            <h4>events bubble</h4>
            <UserActionsDropDown userActions={data.cursor('items')} />
            <h4>callback example</h4>
            <CounterIncrementor />
        </div>
    );
});

function render () {
    React.render(<App data={structure.cursor()}/>, document.getElementById('react-main-mount'));
}

render();

structure.on('swap', render);