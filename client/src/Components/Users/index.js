import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Menu';
import {Link} from 'react-router-dom';
import Albums from '../Albums';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
	},
	nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Users({users, pathname}) {
  const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const open = Boolean(anchorEl);


  function handleClickListItem(event) {
		setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
		setAnchorEl(null);
  }

  function handleClose() {
		setAnchorEl(null);
  }

	if(users.length>0) {
		return (
			<div className={classes.root}>
				<List component="nav">
					<ListItem
						button
						aria-haspopup="true"
						aria-controls="lock-menu"
						aria-label="Select a User"
						onClick={handleClickListItem}
						variant="menu"
					>
						<ListItemText primary="Select a User" secondary={users[selectedIndex].name} />
					</ListItem>
				</List>
				<Menu id="lock-menu" open={open || false} anchorEl={anchorEl} onClose={handleClose} >
				
					{users.map((user, index) => {
						const to = `/users/${user.id}`;

						return (
							<MenuItem
								key={index}
								//selected={to === pathname}
								selected={index === selectedIndex}
								onClick={event => handleMenuItemClick(event, index)}
								to={to}
								component={Link}
							>
								{user.name}
							</MenuItem>
					)})}
				
				</Menu> 
				<Divider />
				<Albums userId={users[selectedIndex].id} pathname={pathname}/>
				
			</div>
			
		);
	}
	return null;
}

export default Users;
