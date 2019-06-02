import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';

import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	nested: {
    paddingLeft: theme.spacing(4),
  },
}));
export default function Albums({pathname, userId}){
	const classes = useStyles();
	const [albums, setAlbums] = React.useState([]);

	React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setAlbums(data); // set users in state
      });
  }, [userId]);

	if(albums.length > 0){
		
		return (
				<MenuList>
					{albums.map(( album ) => {
						const to = `/albums/${album.id}`;
						return (
							<MenuItem
								key={album.id}
								to={to}
								component={Link}
								selected={to === pathname}
								className={classes.nested}
							>
								<Typography variant="inherit" noWrap>{album.title}</Typography>
								
							</MenuItem>
						)
					})}
				</MenuList>
		);
	} else {
		return (
			<MenuItem className={classes.nested}>
				No Albums Found
			</MenuItem>
		);
	}
	
}
