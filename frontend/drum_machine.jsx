const React = require ('react');
const ReactDOM = require ('react-dom');
const DrumPad = require('./components/drum_pad.jsx');
const Sequencer = require('./components/sequencer.jsx');
const Sounds = require('./components/sounds.jsx');
const Instructions = require('./components/instructions.jsx');


const App = React.createClass({
  render: function() {
    return (
      <div>
        <div className='upper-container'>

          <Sounds />
          <DrumPad />
          <Instructions />
        </div>
        <Sequencer />
      </div>
    );
  }
});

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('content'));
});
