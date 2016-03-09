var React = require('react');
var ReactDOM = require('react-dom');

var Chart = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    this.initializeChart(this.props);
  },

  componentWillUnmount: function() {
    var chart = this.state.chart;
    chart.destroy();
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('!!! will receive props', nextProps);
    var chart = this.state.chart;
    if (nextProps.redraw) {
      chart.destroy();
      this.initializeChart(nextProps);
    } else {
      dataKey = dataKey || dataKeys[chart.name];
      updatePoints(nextProps, chart, dataKey);
      if (chart.scale) {
        chart.scale.xLabels = nextProps.data.labels;
        chart.scale.calculateXLabelRotation();
      }
      chart.update();
    }
  },

  initializeChart: function(nextProps) {
    var Chart = require('chart.js');
    var chartType = 'Line';
    var el = ReactDOM.findDOMNode(this);
    var ctx = el.getContext('2d');
    var chart = new Chart(ctx)[chartType](nextProps.data, nextProps.options || {});
    this.setState({ chart: chart });
  },

  render: function() {
    var _props = {
      ref: 'canvass'
    };

    for (var name in this.props) {
      if (this.props.hasOwnProperty(name)) {
        if (name !== 'data' && name !== 'options') {
          _props[name] = this.props[name];
        }
      }
    }
    console.log('chart props',_props);
    return React.createElement('canvas', _props);
  }
});

module.exports = Chart;
