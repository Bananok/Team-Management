import React, { FC, useCallback, useState, ChangeEvent } from 'react';

import {
  Grid,
  Button,
  Typography,
  TextField,
  Box,
  IconButton,
  RadioGroup,
  Radio,
  createTheme,
  ThemeProvider,
  FormControlLabel
} from '@mui/material';

// Icons
import Close from '@mui/icons-material/Close';

// Styles
import classes from './AddMemberModal.module.scss';

// Layouts
import Profile from '../../layouts/ProfileLayout';

// Stores
import { inviteMemberOwner } from '../../api/sendLink';

interface AddMemberProps {
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const AddMember: FC<AddMemberProps> = ({ isOpen, setOpen }) => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const emailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const nameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const roleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  }, []);

  const handleClose = useCallback((cIsOpen: boolean) => {
    setOpen(!cIsOpen);
  }, []);

  const sendLink = () => {
    if (email.length && name.length && role.length) {
      inviteMemberOwner(email, name, role);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f36d25'
      }
    }
  });

  return (
    <Profile isOpen={isOpen} handleClose={handleClose}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1} className={classes.nameContainer}>
          <Grid item xs={11}>
            <h2>Adding a member</h2>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => handleClose(isOpen)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={1} className={classes.box}>
          <Grid item xs={3}>
            <Typography className={classes.font}>Full name</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              fullWidth
              value={name}
              onChange={nameChange}
              autoFocus
              InputProps={{
                classes: {
                  root: classes.font
                }
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} className={classes.box}>
          <Grid item xs={3}>
            <Typography className={classes.font}>Email</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              fullWidth
              value={email}
              onChange={emailChange}
              autoFocus
              InputProps={{
                classes: {
                  root: classes.font
                }
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} className={classes.box}>
          <Grid item xs={3}>
            <Typography className={classes.font}>Role</Typography>
          </Grid>
          <Grid item xs={9}>
            <RadioGroup row onChange={roleChange}>
              <FormControlLabel
                control={<Radio />}
                value="USER"
                checked={role === 'USER'}
                label={<Typography className={classes.font}>User</Typography>}
              />
              <FormControlLabel
                control={<Radio />}
                value="MANAGER"
                checked={role === 'MANAGER'}
                label={
                  <Typography className={classes.font}>
                    Project Manager
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Radio />}
                value="ADMIN"
                checked={role === 'ADMIN'}
                label={<Typography className={classes.font}>Admin</Typography>}
              />
            </RadioGroup>
          </Grid>
        </Grid>

        <Box className={classes.box}>
          <Button
            variant="contained"
            className={classes.inviteButton}
            onClick={sendLink}
          >
            INVITE
          </Button>
        </Box>
      </ThemeProvider>
    </Profile>
  );
};

export default AddMember;
