var Chart = React.createClass({

  displayName: 'Chart',

  propTypes: function() {
    data: React.PropTypes.object.isRequired
  },

  myChartRef: function(ref) {
    var ctx = ReactDOM.findDOMNode(ref)
    var myChart = new Chart(ctx, {
      type: 'line',
      data: this.props.data,
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });
  },

  render: function() {
    return <canvas ref={this.myChartRef} width="200" height="200"></canvas>
  }
});
