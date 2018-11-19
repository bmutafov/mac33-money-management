import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { ListItem, Avatar, ListItemSecondaryAction } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import colors from '../helpers/colors';
import Add from '@material-ui/icons/Add'
import Undo from '@material-ui/icons/Undo'

class SplitListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      totalValue: 0,
      addingVal: 0,
    };
    this.prevStates = [];
    this.prevStates[0] = this.state;
  }

  handleAdd = () => {
    this.prevStates.push(this.state);
    let { totalValue, addingVal } = this.state;
    totalValue += parseFloat(addingVal);
    this.setState({
      totalValue
    });
    this.props.handlerAdd(this.props.user.id, totalValue);
  }

  handleCheckbox = () => {
    this.setState({
      checked: !this.state.checked,
    });
    this.props.handlerCheckbox(this.props.user.id);
  }

  handleUndo = () => {
    let prevState = this.prevStates.pop();
    if (prevState === undefined) return;
    this.setState(prevState);
    this.props.handlerAdd(this.props.user.id, prevState.totalValue);
  }

  handleAddValueChange = (e) => {
    this.setState({
      addingVal: e.target.value,
    })
  }

  render() {
    let { user } = this.props;
    return (
      <ListItem>
        <Avatar style={{ background: colors[user.color || 0].hex }}>{user.name.charAt(0)}</Avatar>
        <FormGroup row>
          <TextField
            label="Total"
            helperText="Total of personal items"
            margin="normal"
            value={this.state.totalValue}
            style={{ width: 100, marginLeft: 20 }}
          />
          <TextField
            label="Partial"
            margin="normal"
            helperText="Partial amount to be added"
            style={{ width: 100 }}
            onChange={this.handleAddValueChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
          />
          <FormGroup row style={{ marginTop: 25 }}>
            <IconButton color="primary" style={{ marginLeft: 10, width: 50, height: 50 }} onClick={this.handleAdd}> <Add fontSize="small" /> </IconButton>
            <IconButton color="default" style={{ marginLeft: 10, width: 50, height: 50 }} onClick={this.handleUndo}> <Undo fontSize="small" /> </IconButton>
          </FormGroup>
        </FormGroup>
        <ListItemSecondaryAction>
          <Checkbox
            onChange={this.handleCheckbox}
            color="secondary"
            checked={this.state.checked}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default SplitListItem;