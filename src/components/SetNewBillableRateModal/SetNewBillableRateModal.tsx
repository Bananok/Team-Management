import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  useMemo,
  ChangeEvent
} from 'react';

import dayjs, { Dayjs } from 'dayjs';

import {
  Grid,
  Button,
  Typography,
  TextField,
  Box,
  MenuItem,
  IconButton,
  InputAdornment,
  createTheme,
  ThemeProvider
} from '@mui/material';

// Icons
import Close from '@mui/icons-material/Close';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Components
import DatePicker from 'components/DatePicker';

// Stores
import rateStore from 'stores/RateStore';

// Types
import { IRate } from 'types/rate';
import { ExpertizeVariant } from 'types/user';

// Styles
import classes from './SetNewBillableRateModal.module.scss';

interface IProps {
  item: IRate;
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  checked: boolean;
}

const SetNewBillableRate: FC<IProps> = ({ item, isOpen, setOpen, checked }) => {
  const [expertise, setExpertise] = useState<string>(item.expertise);
  const [rate, setRate] = useState<number>(item.rate);
  const [newExpertise, setNewExpertise] = useState<boolean>(true);
  const [startAt, setStartAt] = useState<Dayjs | null>(dayjs(item.date));

  const handleUpdate = useCallback(() => {
    setExpertise(item.expertise);
    setRate(item.rate);
  }, [item]);

  useEffect(() => {
    if (isOpen) {
      handleUpdate();
    }
  }, [item]);

  const expertiseChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setExpertise(e.target.value);
  }, []);

  const rateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRate(Number(e.target.value));
  }, []);

  const handleClose = useCallback((cIsOpen: boolean) => {
    setOpen(!cIsOpen);
  }, []);

  const rubbleExchangeValue = useMemo(() => {
    return (Number(rate) * rateStore.rate).toFixed(2);
  }, [rate]);

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
          <Grid item xs={11}>
            <h2>Edit rate</h2>
          </Grid>

          <Grid item xs={1}>
            <IconButton onClick={() => handleClose(isOpen)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>

        <Box className={classes.textFieldBox}>
          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Expertise</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="standard-basic"
                variant="standard"
                select={newExpertise}
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={expertiseChange}
                value={expertise}
              >
                <MenuItem onClick={() => setNewExpertise(false)}>
                  <AddCircleOutlineIcon />
                  Add new expertise
                </MenuItem>
                {Object.values(ExpertizeVariant).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={12}>
              <Typography className={classes.font}>
                What is the new billable rate
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRubleIcon />
                    </InputAdornment>
                  ),
                  classes: {
                    root: classes.font
                  }
                }}
                variant="standard"
                value={checked ? rubbleExchangeValue : rate}
                onChange={rateChange}
                disabled={checked}
              />
            </Grid>

            {checked ? (
              <Grid item xs={4}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                    classes: {
                      root: classes.font
                    }
                  }}
                  variant="standard"
                  value={rate}
                  onChange={rateChange}
                />
              </Grid>
            ) : (
              ''
            )}

            {checked ? (
              <Grid item xs={4}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyExchangeIcon />
                      </InputAdornment>
                    ),
                    classes: {
                      root: classes.font
                    }
                  }}
                  variant="standard"
                  value={rateStore.rate}
                  disabled
                />
              </Grid>
            ) : (
              ''
            )}
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={12}>
              <Typography className={classes.font}>
                Apply this bilable rate to
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.font}>
                Time entries from
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <DatePicker date={startAt} onChange={setStartAt} />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.font}>onwards</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.buttonBox}>
          <Button className={classes.cancel}>DELETE</Button>
          <Button className={classes.cancel}>CANCEL</Button>
          <Button className={classes.save}>SAVE</Button>
        </Box>
      </ThemeProvider>
    </Profile>
  );
};
export default SetNewBillableRate;
