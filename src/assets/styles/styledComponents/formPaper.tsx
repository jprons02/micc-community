import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// use this paper for all forms
// box shadow is equivalent to paper elevation 3

export const FormPaper = styled(Paper)(({ theme }) => ({
  boxShadow:
    '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
  padding: theme.spacing(3),
  maxWidth: '450px',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
