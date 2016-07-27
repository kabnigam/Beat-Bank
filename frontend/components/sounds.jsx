const React = require('react');
const MusicBox = require('./music_box');


const Sounds = React.createClass({
  getInitialState: function() {
    return {
      sounds: {},
      seqSounds: {
        's-one': "https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.wav",
        's-two': "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Snare+5.wav",
        's-three':'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+3.wav',
        's-four': 'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+4.wav',
        's-five': 'https://s3-us-west-1.amazonaws.com/soundsamples/biggie5.wav',
        's-six':'https://s3-us-west-1.amazonaws.com/soundsamples/WOO.wav',
        's-seven':'https://s3-us-west-1.amazonaws.com/soundsamples/LEX+Chant.wav' }
    };
  },
  componentDidMount: function() {

    $('.current-kit').html('Biggie 140 BPM');
    let sounds = {
      'p0': ['https://s3-us-west-1.amazonaws.com/soundsamples/biggie1.wav', 'Biggie 1'],
      'p1': ['https://s3-us-west-1.amazonaws.com/soundsamples/biggie2.wav', 'Biggie 2'],
      'p2': ['https://s3-us-west-1.amazonaws.com/soundsamples/biggie4.wav', 'Biggie 4'],
      'p3': ['https://s3-us-west-1.amazonaws.com/soundsamples/biggie5.wav', 'Biggie 5'],
    };
    this.setState({sounds: sounds});
  },

  _handleDrop: function(e, ui) {

    if (ui.draggable.context.dataset.kit && e.target.attributes[0].value === "current-kit ui-droppable") {
      $('p.inst').remove();
      this.setState({sounds: {}});
      let urls = ui.draggable.context.dataset.kit.split(',');
      let sounds = ui.draggable.context.dataset.sounds.split(',');
      let temp = {};
      for (var i = 0; i < urls.length; i++) {

        temp[`p${i}`] = [urls[i], sounds[i]];
      }
      this.setState({sounds: temp});

      $(e.target).html(ui.draggable.context.innerHTML);
    }
    else if (ui.draggable.context.dataset.url && e.target.attributes[0].value === "instrument-name ui-droppable") {
      let temp = this.state.seqSounds;
      this.setState({seqSounds: {}});
      temp[e.target.attributes[1].value] = ui.draggable.context.dataset.url;
      $(e.target).html(ui.draggable.context.innerHTML);
      this.setState({seqSounds: temp});
    }

    else if (ui.draggable.context.dataset.url && e.target.attributes[0].value.includes('pad')) {
      let temp = this.state.sounds;
      $('p.inst').remove();
      this.setState({sounds: {}});

      temp[`p${e.target.attributes[1].value}`] = [ui.draggable.context.dataset.url, ui.draggable.context.innerHTML];


      this.setState({sounds: temp});
    }

  },

  render: function() {

    let that = this;
    let pads = Object.keys(this.state.sounds).map(id => {

      $(`.pad.${id}`).append(`<p class='inst'>${this.state.sounds[id][1]}</p>`);
      return (
        <audio id={id}>
          <source src={this.state.sounds[id][0]} />
        </audio>
      );
    });
    let seqs = Object.keys(this.state.seqSounds).map(id => {

      return (
        <audio id={id}>
          <source src={this.state.seqSounds[id]} />
        </audio>
      );
    });

    return (
      <div className='sounds'>

        <div className='pad-sounds'>
          {pads}
        </div>
        <div className='sequencer-sounds'>
          {seqs}
        </div>

      </div>
    );
  }
});

module.exports = Sounds;
