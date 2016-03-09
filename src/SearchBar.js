var React = require('react');
var Suggest = require('./Suggest');

var data = require('dsv?delimiter=,!../assets/companies.csv');

var SuggestionList = React.createClass({
  getDefaultProps: function(){
    return {
      onSelect: function(){}
    };
  },

  onClick: function(selection){
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
        <li>
          <a href="" data={v} onClick={this.onClick({code: v.code, name: v.name})}>
            {v.code} {v.name}
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
      suggestions: []
    };
  },

  componentWillMount: function() {
    this.suggest = Suggest(data);
  },

  componentWillReceiveProps: function(nextProps){
    var code = nextProps.value.code || '';
    var name = nextProps.value.name || '';

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

  render: function() {
    return (
      <div>
        <input value={this.state.value} onClick={this.onClick} onChange={this.onChange} type="text" />
        <div>
          {this.state.suggestions.length > 0? <SuggestionList {...this.props} list={this.state.suggestions} /> : null}
        </div>
      </div>
    );
  }
});
module.exports = SearchBar;
