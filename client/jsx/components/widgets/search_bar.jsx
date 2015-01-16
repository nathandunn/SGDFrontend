/** @jsx React.DOM */
"use strict";

var React = require("react");
var _ = require("underscore");

module.exports = React.createClass({
	propTypes: {
		placeholderText: React.PropTypes.string,
		onSubmit: React.PropTypes.func // query =>
	},

	getDefaultProps: function () {
		return {
			placeholderText: ""
		};
	},

	getInitialState: function () {
		return {
			query: ""
		};
	},

	render: function () {
		var _hasExit = this.state.query !== "";
		var exitNode = (this.state.query === "") ? null : <span onClick={this._clear} style={{ position: "absolute", top: 5, right: "1rem", fontSize: 18, cursor: "pointer" }}><i className="fa fa-times"></i></span>;

		return (
			<div className="row collapse">
				<form onSubmit={this._onSubmit}>
					<div className="small-10 columns" style={{ paddingLeft: 0, paddingRight: 0, position: "relative" }}>
						{exitNode}
						<input onChange={this._onType} type="text" ref="searchInput" placeholder={this.props.placeholderText} value={this.state.query} />
					</div>
					<div className="small-2 columns" style={{ paddingLeft: 0 }}>
						<input type="submit" href="#" className="button secondary postfix" value="Search" />
					</div>
				</form>
			</div>
		);
	},

	_onType: function (e) {
		this.setState({ query: this.refs.searchInput.getDOMNode().value });
	},

	_onSubmit: function (e) {
		if (e) e.preventDefault();
		if (this.props.onSubmit) {
			this.props.onSubmit(this.state.query);
		}
	},

	_clear: function (e) {
		this.setState({ query: "" });
		if (this.props.onSubmit) {
			this.props.onSubmit("");
		}
	}
});
