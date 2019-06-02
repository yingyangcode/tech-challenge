import React, {  Fragment } from 'react';
import {  withRouter } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, 
		Drawer, CssBaseline,
} from '@material-ui/core';
import {  makeStyles } from '@material-ui/core/styles';

import Users from '../Users';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
	},
	nested: {
    paddingLeft: theme.spacing(4),
  },
}));



function PermanentDrawerLeft({users, location: { pathname }, children}) {
  const classes = useStyles();
	
  return (
		<Fragment>
		<CssBaseline />
    <div className={classes.root}>
      
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
				anchor="left"
      >
        <div className={classes.toolbar}>
					<Users users={users} pathname={pathname} classes={classes}/>
				</div>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
					{children}
				
      </main>
    </div>
		</Fragment>
  );
}

export default withRouter(PermanentDrawerLeft);