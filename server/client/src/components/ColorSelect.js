import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import colors from '../helpers/colors';

class ColorSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 0,
    }
  }

  render() {
    return (
      <TextField
        select
        label={this.props.label}
        value={this.state.color}
        helperText={this.props.helperText}
        style={{ width: 300 }}
        onChange={(e) => { this.props.handler(e); this.setState({ color: e.target.value }) }}
        margin="normal"
        variant="outlined"
      >
        {colors.map(color => {
          return (
            <MenuItem key={color.id} value={color.id}>
              <Avatar
                style={
                  {
                    background: color.hex,
                    width: 24,
                    height: 24,
                    float: 'left',
                    fontSize: 14,
                    marginRight: 10
                  }
                }>
                {color.label.charAt(0)}
              </Avatar>
              {color.label}
            </MenuItem>
          );
        })}
      </TextField>
    );
  }
}

export default (ColorSelect);
