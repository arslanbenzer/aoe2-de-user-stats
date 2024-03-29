import React, { Component } from 'react';
import TableLeaderboard from './tables/TableLeaderBoard.js'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { corsAnywhere } from './appConstants.js'
import { MenuItem, Select } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "76561198014256703",
      count: "100",
      searchParam: "",
      leaderboard_id: 3,
      currentLeader: 3,
      typing: false,
      typingTimeout: 0,
    }

    this.getLeaderboardData(3);
  }

  getLeaderboardData = (leaderboard_id) => {
    const axios = require('axios');
    axios.get(corsAnywhere + 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=' + leaderboard_id + '&start=1&search=' + this.state.searchParam + '&count=' + this.state.count).then((resp) => {
      this.setState({ 'leaderboard': resp.data.leaderboard, 'currentLeader': leaderboard_id });
    });
  }

  changeSearchText = (event) => {
    const self = this;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    const { currentLeader } = this.state;

    this.setState({
      searchParam: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.getLeaderboardData(currentLeader);
      }, 700)
    });
  }

  onChangeLeaderboard = (event) => {
    this.getLeaderboardData(event.target.value);
  }

  render() {
    return (
      <div style={{ marginLeft: 40 + 'px' }}>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Select color="primary" onChange={this.onChangeLeaderboard} defaultValue={3}>
            <MenuItem value={3}>1v1 Random Map</MenuItem>
            <MenuItem value={4}>Team Random Map</MenuItem>
            <MenuItem value={13}>1v1 Empire Wars</MenuItem>
            <MenuItem value={14}>Team Empire Wars</MenuItem>
          </Select>
        </div>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField name="count" label="count" variant="outlined" value={this.state.count} onChange={event => this.setState({ "count": event.target.value })} style={{ marginLeft: 10 + 'px' }} />
          <TextField name="searchParam" label="Search Text" variant="outlined" value={this.state.searchParam} onChange={event => this.changeSearchText(event)} style={{ marginLeft: 10 + 'px' }} />
        </div>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {this.state && this.state.leaderboard ?
            <TableLeaderboard players={this.state.leaderboard} /> : null
          }
        </div>
      </div>
    );
  }
}

export default App;
