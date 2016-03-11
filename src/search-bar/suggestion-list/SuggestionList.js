var React = require('react');

require('!style!css!sass!./SuggestionList.scss');

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

module.exports = SuggestionList;
