import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Info from '@material-ui/icons/Info';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

class InfoIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <ClickAwayListener onClickAway={this.handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={this.handleTooltipClose}
          open={this.state.open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={this.props.title}
          placement="bottom-start"
        >
          <IconButton color="primary" onClick={this.handleTooltipOpen}>
            <Info />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    );
  }
}

export default InfoIcon;