import React, {
  FC,
  useState,
  useCallback,
  ChangeEvent,
  useEffect
} from 'react';

import {
  Grid,
  Avatar,
  Typography,
  TextField,
  Box,
  IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Icons
import Close from '@mui/icons-material/Close';
import Archive from '@mui/icons-material/Archive';

// Types
import { User } from 'types/user';

// Components
import Profile from 'layouts/ProfileLayout';

// Styles
import classes from './MemberProfileModal.module.scss';

interface IProps {
  item: User;
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const MemberProfile: FC<IProps> = ({ item, isOpen, setOpen }) => {
  const [fullName, setFullName] = useState<string>(item.name);
  const [email, setEmail] = useState<string>(item.email);

  const handleUpdate = useCallback(() => {
    setFullName(item.name);
    setEmail(item.email);
  }, [item]);

  useEffect(() => {
    if (isOpen) {
      handleUpdate();
    }
  }, [item]);

  const handleClose = useCallback((cIsOpen: boolean) => {
    setOpen(!cIsOpen);
  }, []);

  const takeNameByRow = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  }, []);

  const takeEmailByRow = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f36d25'
      }
    }
  });

  return (
    <Profile isOpen={isOpen}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1} className={classes.pageName}>
          <Grid item xs={10}>
            <h2 className={classes.font}>Member Profile</h2>
          </Grid>

          <Grid item xs={1}>
            <IconButton>
              <Archive />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => handleClose(isOpen)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        <Box className={classes.mainBox}>
          <Avatar className={classes.avatar}>OP</Avatar>
          <Box className={classes.textFieldBox}>
            <Grid container className={classes.gridBox}>
              <Grid item xs={4}>
                <Typography className={classes.font}>Full Name</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="standard"
                  fullWidth
                  autoFocus
                  value={fullName}
                  onChange={takeNameByRow}
                  InputProps={{
                    classes: {
                      root: classes.font
                    }
                  }}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.gridBox}>
              <Grid item xs={4}>
                <Typography className={classes.font}>Email</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="standard"
                  fullWidth
                  autoFocus
                  value={email}
                  onChange={takeEmailByRow}
                  InputProps={{
                    classes: {
                      root: classes.font
                    }
                  }}
                  disabled
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} className={classes.gridBox}>
              <Grid item xs={4}>
                <Typography className={classes.font}>Status</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography className={classes.orangeText}>
                  {item.status}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </Profile>
  );
};

export default MemberProfile;
