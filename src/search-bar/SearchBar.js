var React = require('react');
var SuggestionList = require('./suggestion-list');
var Suggest = require('../suggest');

require('!style!css!sass!./SearchBar.scss');

var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      suggestions: [],
      focused: false
    };
  },

  componentWillMount: function() {
    this.suggest = Suggest(this.props.data);
  },

  componentWillReceiveProps: function(nextProps){
    var code = nextProps.value[0] || '';
    var name = nextProps.value[1] || '';

    this.setState({
      value: (code + ' ' + name).trim(),
      suggestions: nextProps.clearSuggestions? [] : this.state.suggestions
    });
  },

  onChange: function(event) {
    var value = event.target.value;
    var s = (value.length > 1)? this.suggest.get(value) : [];

    this.setState({
      suggestions: s,
      value: value
    });
  },

  onFocus: function() {
    this.setState({focused: true});
  },
  onBlur: function() {
    this.setState({focused: false});
  },

  render: function() {
    return (
      <div className="search-bar">
        <input
        value={this.state.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        className={this.state.focused? 'focused': null}
        type="text" />

        <div>
          {this.state.suggestions.length > 0? <SuggestionList {...this.props} list={this.state.suggestions} /> : null}
        </div>
      </div>
    );
  }
});
module.exports = SearchBar;
