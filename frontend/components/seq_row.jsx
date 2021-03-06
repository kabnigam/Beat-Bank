const React = require('react');
const NoteConstants = require('../constants/note_constants');

const SeqRow = React.createClass({
  getInitialState: function() {
    var clicked = [];
    if (this.props.clicked) {
      clicked = this.props.clicked;
    }
    return {note: 4, clicked: clicked};
  },
  componentDidMount: function() {


    document.addEventListener("keydown", function(e){
      if (e.which === 16) {
        $('li.note-step').mouseenter(function() {
          if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
          } else {
            $(this).addClass('clicked');
          }
        });

      }
    }, false);

    document.addEventListener("keyup", function(e){
      if (e.which === 16) {
        $('li.note-step').off("mouseenter");
      }
    }, false);



  },
  _handleClick: function(e) {

    if ($(e.target).hasClass('clicked')) {
      $(e.target).removeClass('clicked');
    } else {
      $(e.target).addClass('clicked');
    }

  },

  _setNote: function(e) {

    this.props.setNote(e.target.value);
    var clicked = [];
    var ratio = e.target.value/this.state.note;
    for (var i = 0; i < $(e.target).parent().children().length; i++) {
      if ($(e.target).parent().children().eq(i).hasClass('clicked')) {
        clicked.push(i*ratio);
      }
    }
    $(e.target).parent().children().removeClass('clicked');
    this.setState({note: e.target.value, clicked: clicked});
  },

  _makeRow: function() {
    var row = [];
    var ratio = parseInt(this.state.note)/4;
    this.width = 50/ratio;


    var divStyle = {
      width: `${this.width}px`,
    };

    for (var i = 0; i < this.props.steps * ratio; i++) {

        row.push(<li key = {`note-step${i}`}className='note-step' onClick={this._handleClick} data-pad={this.props.pad} style={divStyle}></li>);

    }

    row.push(
      <select key={'select-note-length'}className='note-length' onChange={this._setNote} value={this.state.note}>
        <option key={'note-length-4'} value='4'>4</option>
        <option key={'note-length-8'} value='8'>8</option>
      </select>
    );

    return row;
  },



  render: function() {
    var row = this._makeRow();

    for (var i = 0; i < row.length; i++) {
      if (this.state.clicked.includes(i)) {
        row[i] = <li className='note-step clicked'
          onClick={this._handleClick} data-pad={this.props.pad}
          style={{width: `${this.width}px`}}></li>;
      }
    }

    return (
      <div>
        <ul className='sequencer-row' data-pad={this.props.pad}>
          {row}
        </ul>
      </div>
    );
  }
});

module.exports = SeqRow;
