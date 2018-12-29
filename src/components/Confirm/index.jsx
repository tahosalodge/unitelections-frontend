import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Confirm extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  state = {
    confirmed: false,
  };

  click = () => {
    const { confirmed } = this.state;
    if (confirmed) {
      this.props.onClick();
    } else {
      this.setState({ confirmed: true });
    }
  };

  render() {
    const { text } = this.props;
    const { confirmed } = this.state;
    return (
      <ListItem {...this.props} onClick={this.click}>
        <ListItemText primary={confirmed ? 'Are you sure?' : text} />
      </ListItem>
    );
  }
}

export default Confirm;
