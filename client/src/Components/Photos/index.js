import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Photos({match}) {
	const classes = useStyles();
	const [photos, setPhotos] = React.useState([]);
	
	const albumId = match.params.albumId;
	
  const [isLoading, setIsLoading] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	React.useEffect(() => {
		const fetchData = async ()=> {
			setIsError(false);
			setIsLoading(true);
			fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
				.then(response => response.json())
				.then(data => {
					setPhotos(data); 
				})
				.catch(e => {
					setIsError(true);
				});
			setIsLoading(false);
		};
		fetchData();
	}, [albumId]);

	if(!albumId) {
		return (
			<div>
				<Typography>
					Please Select an Album
				</Typography>
			</div>
		);
	}
	return (
		<React.Fragment>
			<CssBaseline />
			<main>
				<Container className={classes.cardGrid} maxWidth="md">
					{isError && <div>Something went wrong ...</div>}
					{isLoading ? (
						<div>Loading...</div>
					) :(
						<Grid container spacing={4}>
						{photos.map(photo => (
							<Grid item key={photo.id} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image={photo.url}
										title={photo.title}
									/>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant="h5" component="h2">
											{photo.title}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary">
											View
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
					)}
					
				</Container>
			</main>
		</React.Fragment>
		
	);
}
