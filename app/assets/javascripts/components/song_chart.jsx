var SongChart = React.createClass({

  displayName: 'SongChart',

  propTypes: function() {
    data: React.PropTypes.object.isRequired
  },

  myChart: function(ref) {
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
    return <canvas ref={this.myChart} width="200" height="200"></canvas>
  }
});
