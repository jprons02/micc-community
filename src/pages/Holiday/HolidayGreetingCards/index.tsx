import React from 'react';
import SimpleDialog from '../../../components/dialog/SimpleDialog';
import Button from '@mui/material/Button';

// assets
import bgHolidayImage from '../../../assets/media/images/holidayGreetingCards/holidaybg.jpg';

// styles
import '../../../assets/styles/css/pages/GreetingCards.css';

// card images
import { thanksgivingImageArray } from './thanksgivingImageArray';
import { xmasImageArray } from './xmasImageArray';

//material-ui
import { Container } from '@mui/material';

const HolidayGreetingCardIndex = () => {
  //create state for dialog.
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [imageArray, setImageArray] = React.useState(thanksgivingImageArray);
  const handleClose = () => {
    setOpenDialog(false);
  };

  const [holiday, setHoliday] = React.useState('thanksgiving');

  const handleClick = (holiday: string) => {
    setHoliday(holiday);
    if (holiday === 'thanksgiving') {
      setImageArray(thanksgivingImageArray);
    }
    if (holiday === 'xmas') {
      setImageArray(xmasImageArray);
    }
  };

  const renderCards = () => {
    return imageArray.map((card, index) => {
      const width = card.portrait ? '150px' : '207px';
      return (
        <div className="greeting-card-container" key={index}>
          <p
            style={{
              fontSize: '14px',
              margin: '0 0 10px 0',
              display: 'inline-block',
              verticalAlign: 'top',
            }}
          >
            {index + 1})
          </p>
          <div className="greeting-card-figure-container">
            <figure
              style={{
                display: 'inline-block',
                margin: '0 15px 15px 8px',
                width: width,
              }}
            >
              <img
                src={card.outside}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  border: '1px solid black',
                }}
                onClick={() => {
                  setDialogContent(card.outside);
                  setOpenDialog(true);
                }}
              />
              <figcaption
                style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  color: 'grey',
                }}
              >
                Cover
              </figcaption>
            </figure>
            <figure
              style={{
                display: 'inline-block',
                margin: '0 15px 15px 8px',
                width: width,
              }}
            >
              <img
                src={card.inside}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  border: '1px solid black',
                }}
                onClick={() => {
                  setDialogContent(card.inside);
                  setOpenDialog(true);
                }}
              />
              <figcaption
                style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  color: 'grey',
                }}
              >
                Inside
              </figcaption>
            </figure>
          </div>
        </div>
      );
    });
  };

  const renderDisclaimer = () => {
    return (
      <div>
        <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: '500' }}>
          Custom designs will incur a design fee and should be requested two
          weeks in advance to ensure timely delivery. <br />
          Please contact MAPA at 305-894-2375,{' '}
          <a href="mailto:mapa@miccosukee.com">mapa@miccosukee.com</a>.
        </p>
      </div>
    );
  };

  const buttonStyle = { marginRight: '10px', marginBottom: '10px' };

  return (
    <div style={{ paddingBottom: '50px' }}>
      <div
        className="greeting-card-header-bg"
        style={{ backgroundImage: `url(${bgHolidayImage})` }}
      >
        <div>
          <h1 className="page-header">GREETING CARDS</h1>
        </div>
      </div>
      <Container maxWidth="lg">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '40px 0',
          }}
        >
          <Button
            style={buttonStyle}
            onClick={() => handleClick('thanksgiving')}
            variant={holiday === 'thanksgiving' ? 'contained' : 'outlined'}
          >
            ThanksGiving
          </Button>
          <Button
            style={buttonStyle}
            onClick={() => handleClick('xmas')}
            variant={holiday === 'xmas' ? 'contained' : 'outlined'}
          >
            Christmas
          </Button>
        </div>
        {renderCards()}
        <hr
          style={{
            margin: '50px auto',
            width: '150px',
            border: '1px solid rgb(212 212 212)',
          }}
        />
        <div>{renderDisclaimer()}</div>
        <SimpleDialog
          dialogContent={dialogContent}
          open={openDialog}
          handleClose={handleClose}
        />
      </Container>
    </div>
  );
};

export default HolidayGreetingCardIndex;
