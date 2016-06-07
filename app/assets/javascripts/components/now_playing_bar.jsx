var NowPlaying = React.createClass({

  displayName: 'NowPlaying',

  propTypes: function() {
    handlePlayPause: React.PropTypes.function.isRequired
  },

  getDefaultProps: function() {
    return {soundPoints: [12, 19, 3, 5, 2, 3]}
  },

  getInitialState: function() {
    return {dynamicSoundPoints: [], chartData: {}}
  },

  componentDidMount: function() {
    this.addSoundPoint();
  },

  addSoundPoint: function() {
    var counter = 0;
    var timer = setInterval(function() {
      this.setState({
        dynamicSoundPoints: this.state.dynamicSoundPoints.concat(this.props.soundPoints[counter]),
        chartData: {
          labels: [1, 2, 3, 4, 5, 6, 7],
          datasets: [
            {
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  '#DDDDDD'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            },
            {
              data: this.state.dynamicSoundPoints,
              backgroundColor: [
                  'white'
              ],
              borderColor: [
                  'green'
              ],
              borderWidth: 1
            }
          ]
        }
      })
      counter++
      if (counter >= this.props.soundPoints.length) {
        clearInterval(timer);
      }
    }.bind(this), 3000)
  },

  render: function() {
    return <div className="navbar navbar-default navbar-fixed-bottom play-bar">
             <a href="#" className="play-pause-buttons" onClick={this.props.handlePlayPause}>
              <i className="fa fa-stop"></i>
             </a>
             <span className="h4">Now Playing: </span>{this.props.currentSong}
             <div className='col-xs-4'>
               <Chart data={this.state.chartData} />
             </div>
           </div>
  }
});
