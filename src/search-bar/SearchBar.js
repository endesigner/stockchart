var React = require('react');
var Suggest = require('../suggest');

require('!style!css!sass!./SearchBar.scss');

var SuggestionList = React.createClass({
  getDefaultProps: function(){
    return {
      onSelect: function(){}
    };
  },

  onClick: function(selection){
    console.log('clicked',selection);
    return function(event) {
      event.preventDefault();
      this.props.onSelect(selection);
    }.bind(this);
  },

  render: function(){
    var v, list;

    list = Object.keys(this.props.list).map(function(item, index){
      v = this.props.list[item];
      return (
        <li key={index}>
          <a href="" data={v} onClick={this.onClick(v)}>
            {v[0]} {v[1]}
          </a>
        </li>
      );
    }, this);

    return (<ul>{list}</ul>)
  }
});

var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      suggestions: [],
      focused: false
    };
  },

  componentWillMount: function() {
    console.log(this.props);
    this.suggest = Suggest(this.props.data);
  },

  componentWillReceiveProps: function(nextProps){
    console.log('@@@',nextProps);
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
      <div>
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
