const React = require('react');
const queryString = require('query-string');
const api = require('../utils/api');
class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };
  componentDidMount() {
    let players = queryString.parse(this.props.location.search);
    api.battle([players.playerOneName, players.playerTwoName]).then(results => {
      console.log(results);
    });
  }
  render() {
    let { error, winner, loser, loading } = this.state;
    if (loading === true) {
      return <p>Loading</p>;
    } else {
      return <div>Results</div>;
    }
  }
}

module.exports = Results;
