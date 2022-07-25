import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 25,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '18px'
    },
    footerLink: {
        textDecoration: 'none',
        color: 'black'
    },
    githubIcon: {
        display: 'inline',
        transform: 'translateY(35%)',
        marginRight: '5px'
    },
    githubLink: {
        display: 'inline'
    }
}));