const React = require('react');
const MusicBox = require('./music_box');


const Sounds = React.createClass({
  getInitialState: function() {
    return {
      sounds: {},
      seqSounds: {
        's-one': "https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.wav",
        's-two': "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Kick+3.wav",
        's-three':'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Snare+5.wav',
        's-four': 'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+3.wav',
        's-five': 'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+4.wav',
        's-six':'https://s3-us-west-1.amazonaws.com/soundsamples/WOO.wav',
        's-seven':'https://s3-us-west-1.amazonaws.com/soundsamples/LEX+Chant.wav' }
    };
  },

  _handleDrop: function(e, ui) {

    if (ui.draggable.context.dataset.kit && e.target.attributes[0].value === "current-kit ui-droppable") {
      $('p.inst').remove();
      this.setState({sounds: {}});
      var urls = ui.draggable.context.dataset.kit.split(',');
      var sounds = ui.draggable.context.dataset.sounds.split(',');
      var temp = {};
      for (var i = 0; i < urls.length; i++) {

        temp[`p${i}`] = [urls[i], sounds[i]];
      }
      this.setState({sounds: temp});

      $(e.target).html(ui.draggable.context.innerHTML);
    }
    else if (ui.draggable.context.dataset.url && e.target.attributes[0].value === "instrument-name ui-droppable") {
      var temp = this.state.seqSounds;
      this.setState({seqSounds: {}});
      temp[e.target.attributes[1].value] = ui.draggable.context.dataset.url;
      $(e.target).html(ui.draggable.context.innerHTML);
      this.setState({seqSounds: temp});
    }

    else if (ui.draggable.context.dataset.url && e.target.attributes[0].value.includes('pad')) {
      var temp = this.state.sounds;
      $('p.inst').remove();
      this.setState({sounds: {}});

      temp[`p${e.target.attributes[1].value}`] = [ui.draggable.context.dataset.url, ui.draggable.context.innerHTML];


      this.setState({sounds: temp});
    }

  },

  render: function() {

    var that = this;

    var seqs = Object.keys(this.state.seqSounds).map(id => {

      return (
        <audio key={`audio${id}`} id={id}>
          <source key={`source${id}`} src={this.state.seqSounds[id]} />
        </audio>
      );
    });

    return (
      <div className='sounds'>


        <div className='sequencer-sounds'>
          {seqs}
        </div>

      </div>
    );
  }
});

module.exports = Sounds;
