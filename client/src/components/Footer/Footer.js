import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar } from '@material-ui/core';
import useStyles from './styles';

const Footer = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.footer}>
                <a className={classes.footerLink} target='_blank' rel='noopener noreferrer' href='https://github.com/i-abramson19/memories'>
                    <GitHubIcon className={classes.githubIcon}></GitHubIcon><h6 className={classes.githubLink}>github.com/i-abramson19/memories</h6>
                </a>
            </div>
        </AppBar>
    );
}

export default Footer;