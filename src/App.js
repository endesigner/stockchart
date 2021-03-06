require('!style!css!sass!./App.scss');

var React = require('react');
var request = require('superagent');

var SearchBar = require('./search-bar');
var Chart = require('./chart');

var App =  React.createClass({
  getInitialState: function(){
    return {
      selected: '',
      loading: false,
      windowWidth: window.innerWidth
    }
  },

  onSelect: function(selection) {
    var url = 'https://www.quandl.com/api/v3/datasets/WIKI/'
    + selection[0] + '.json'
    + '?order=asc'
    + '&exclude_column_names=true'
    + '&end_date=2016-02-01'
    + '&start_date=2006-02-01'
    + '&column_index=4';

    request
    .get(url)
    .end(function(error, response){
      if (error) {
        return;
      }

      this.setState({
        data: response.body.dataset.data,
        loading: false
      });

    }.bind(this));

    // Display loader while waiting...
    this.setState({ selected: selection, loading: true });
  },


  handleResize: function(e) {
    setTimeout(function(){
      this.setState({windowWidth: window.innerWidth});
    }.bind(this), 200);
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function() {
    var data = {
      labels: [],
      datasets: [{ data: [] }]
    };

    if (this.state.selected && this.state.data ) {
      this.state.data.forEach(function(point, index){
        var label = (index % (90) == 0)? point[0] : '';
        data.labels.push(label);
        data.datasets[0].data.push(point[1])
      });
    }

    var options = {
      animation: false,
      showTooltips: false,

      bezierCurve : false,
      pointDot : false,
      datasetFill : false,
      legendTemplate : false,
      scaleLabel: "<%='  '+value%>"
    };

    var loading = (<div className="loader" >Laddar {this.state.selected[0]}...</div>);
    var chart = (<Chart width={this.state.windowWidth} height="300" data={data} options={options} />);

    var suggestions = require('../assets/companies.js');
    return (
      <div className="stockchart">
        <SearchBar
        onSelect={this.onSelect}
        value={this.state.selected}
        placeholder="Sök på bolagsnamn eller tickerkod..."
        data={suggestions}
        clearSuggestions={this.state.loading}
        />

        { this.state.loading? loading : null }
        { (this.state.selected && !this.state.loading)? chart : null }
      </div>
    );
  }

});
module.exports = App;
