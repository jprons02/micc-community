export const formStyles = {
  form: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '500px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '5px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
  },
  //DESKTOP VIEW
  '@media screen and (min-width: 960px)': {
    form: {
      width: '50%',
    },
  },
};
