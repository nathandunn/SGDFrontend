import React from 'react';
import Select from 'react-select';
import _ from 'underscore';

export const CheckField = React.createClass({
  propTypes: {
    displayName: React.PropTypes.string,
    paramName: React.PropTypes.string,
    defaultChecked: React.PropTypes.bool,
    iconClass: React.PropTypes.string,
    isReadOnly: React.PropTypes.bool
  },

  render () {
    if (this.props.isReadOnly) return this._renderReadOnly();
    let _id = `sgd-c-check-${this.props.paramName}`;
    let iconNode = this.props.iconClass ? <span><i className={`fa fa-${this.props.iconClass}`} /> </span> : null;
    return (
      <div>
        <input id={_id} type='checkbox' name={this.props.paramName} defaultChecked={this.props.defaultChecked} />
        <label htmlFor={_id}>{iconNode}{this.props.displayName}</label>
      </div>
    );
  },

  _renderReadOnly () {
    let iconNode = this.props.iconClass ? <span><i className={`fa fa-${this.props.iconClass}`} /> </span> : null;
    let iconClass = this.props.defaultChecked ? 'check-square-o' : 'square-o';
    return (
      <div>
        <label><i className={`fa fa-${iconClass}`} /> {iconNode}{this.props.displayName}</label>
      </div>
    );
  }
});

export const StringField = React.createClass({
  propTypes: {
    displayName: React.PropTypes.string,
    paramName: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    isReadOnly: React.PropTypes.bool
  },

  render () {
    let iconNode = this.props.iconClass ? <span><i className={`fa fa-${this.props.iconClass}`} /> </span> : null;
    let node = this.props.isReadOnly ?
      <p>{this.props.defaultValue}</p> : <input type='text' name={this.props.paramName} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} />;
    return (
      <div>
        <label>{iconNode}{this.props.displayName}</label>
        {node}
      </div>
    );
  }
});

export const TextField = React.createClass({
  propTypes: {
    displayName: React.PropTypes.string,
    paramName: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    isReadOnly: React.PropTypes.bool
  },

  render () {
    let iconNode = this.props.iconClass ? <span><i className={`fa fa-${this.props.iconClass}`} /> </span> : null;
    let node = this.props.isReadOnly ?
      <p>{this.props.defaultValue}</p> : <textarea type='text' name={this.props.paramName} placeholder={this.props.placeholder}>{this.props.defaultValue}</textarea>;
    return (
      <div>
        <label>{iconNode}{this.props.displayName}</label>
        {node}
      </div>
    );
  }
});

export const MultiSelectField = React.createClass({
  propTypes: {
    displayName: React.PropTypes.string,
    optionsUrl: React.PropTypes.string,
    paramName: React.PropTypes.string,
    defaultValues: React.PropTypes.array,
    iconClass: React.PropTypes.string,
    defaultOptions: React.PropTypes.array,
    isReadOnly: React.PropTypes.bool
  },

  getInitialState () {
    return {
      values: this.props.defaultValues || []
    };
  },

  render () {
    if (this.props.isReadOnly) return this._renderReadOnly();
    let iconNode = this.props.iconClass ? <span><i className={`fa fa-${this.props.iconClass}`} /> </span> : null;
    return (
      <div>
        <label>{iconNode}{this.props.displayName}</label>
        <Select multi simpleValue joinValues
          name={this.props.paramName} value={this.state.values}
          asyncOptions={this._getAsyncOptions()}
          labelKey='name' valueKey='id'
          onChange={this._onChange} 
        />
      </div>
    );
  },

  _renderReadOnly () {
    let displayValuesStr = this.state.values.reduce( (prev, d, i) => {
      let maybeComma = (i === this.state.values.length) ? '' : ', ';
      prev += `${d.name}${maybeComma}`;
      return prev;
    }, '');
    let iconNode = this.props.iconClass ? <span><i className={`fa fa-${this.props.iconClass}`} /> </span> : null;
    return (
      <div>
        <label>{iconNode}{this.props.displayName}</label>
        <p>{displayValuesStr}</p>
      </div>
    );
  },

  _onChange (newValues) {
    newValues = newValues ? newValues.split(',').map( d => { return parseInt(d); }) : [];
    this.setState({ values: newValues });
  },

  // from a URL, returns the fetch function needed to get the options
  _getAsyncOptions () {
    return (input, cb) => {
      fetch(this.props.optionsUrl)
        .then( response => {
          return response.json();
        }).then( optionsObj => {
          // add defaultOptions to results and remove duplicated
          let defaultOptions = this.props.defaultOptions || [];
          optionsObj.options = _.uniq(optionsObj.options.concat(defaultOptions));
          if (!this.isMounted()) return;
          return cb(null, optionsObj);
        });
    };
  }
});

export const SelectField = React.createClass({
  propTypes: {
    displayName: React.PropTypes.string,
    paramName: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    options: React.PropTypes.array,
    isReadOnly: React.PropTypes.bool
  },

  getInitialState () {
    return {
      value: this.props.defaultValue || ''
    };
  },

  render () {
    if (this.props.isReadOnly) return this._renderReadOnly();
    let iconNode = this.props.iconClass ? <span><i className={`fa fa-${this.props.iconClass}`} /> </span> : null;
    return (
      <div>
        <label>{iconNode}{this.props.displayName}</label>
        <Select
          name={this.props.paramName} value={this.state.value}
          options={this.props.options} clearable={false}
          labelKey='name' valueKey='id'
          onChange={this._onChange} 
        />
      </div>
    );
  },

  _renderReadOnly () {
    let iconNode = this.props.iconClass ? <span><i className={`fa fa-${this.props.iconClass}`} /> </span> : null;
    return (
      <div>
        <label>{iconNode}{this.props.displayName}</label>
        <p>{this.props.defaultValue}</p>
      </div>
    );
  },

  _onChange (newValue) {
    this.setState({ value: newValue });
  }
});
