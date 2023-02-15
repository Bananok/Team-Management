import React, { FC, useCallback, KeyboardEvent, useState } from 'react';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';

import {
  Box,
  Button,
  createTheme,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  ThemeProvider
} from '@mui/material';

import { Add, Close, CurrencyRuble } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Components
import DatePicker from 'components/DatePicker';

// Types
import { ContractCurrencyVariant } from 'types/rate';

// Styles
import classes from './RateModal.module.scss';

interface RateModalProps {
  defaultRate: number;
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  title: string;
  newRateTitle: string;
  contractCurrency: string;
}

const coefficients = [
  'State tax (1, 24)',
  'Vacation coef (1, 09)',
  'Company tax (1, 2)'
];

const RateModal: FC<RateModalProps> = ({
  defaultRate,
  isOpen,
  setOpen,
  title,
  newRateTitle,
  contractCurrency
}) => {
  const [addCoefficientState, setAddCoefficientState] = useState<boolean>(true);
  const [date, setDate] = useState<Dayjs | null>(
    dayjs('2022-11-07T08:00:31.529Z')
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f36d25'
      }
    }
  });
  const handleClose = useCallback((cIsOpen: boolean) => {
    setOpen(!cIsOpen);
  }, []);

  const handleAddCoefficient = useCallback(() => {
    setAddCoefficientState(false);
  }, []);

  const handleEnterPress = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setAddCoefficientState(true);
    }
  }, []);

  return (
    <Profile isOpen={isOpen} handleClose={handleClose}>
      <ThemeProvider theme={theme}>
        <Box className={classes.box}>
          <div className={classes.modalContainer}>
            <Grid container spacing={1} className={classes.header}>
              <Grid item xs={11}>
                <h2 className={classes.titleFont}>{title}</h2>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => handleClose(isOpen)}>
                  <Close className={classes.close} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1.5}
              className={clsx(classes.gridContainer, classes.gridItem)}
            >
              <Grid container spacing={1.5} className={classes.gridContainer}>
                <Grid item xs="auto" className={classes.font}>
                  {newRateTitle}
                </Grid>
                <Grid item xs={3.4}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {contractCurrency === ContractCurrencyVariant.usd ? (
                            <AttachMoneyIcon />
                          ) : (
                            <CurrencyRuble />
                          )}
                        </InputAdornment>
                      ),
                      classes: {
                        root: classes.font
                      }
                    }}
                    variant="standard"
                    value={defaultRate}
                  />
                </Grid>
              </Grid>
              {title === 'Edit monthly salary net' ? (
                <Grid container spacing={1} className={classes.gridContainer}>
                  <Grid item xs={2.5} className={classes.font}>
                    Coefficient
                  </Grid>
                  <Grid item xs={7.8} className={classes.gridItem}>
                    <TextField
                      select={addCoefficientState}
                      onKeyDown={handleEnterPress}
                      fullWidth
                      InputProps={{
                        classes: {
                          root: classes.font
                        }
                      }}
                      variant="standard"
                    >
                      <MenuItem
                        className={clsx(classes.addIcon, classes.font)}
                        onClick={handleAddCoefficient}
                      >
                        <Add className={classes.add} />
                        Add a coefficient
                      </MenuItem>
                      {coefficients.map((option) => (
                        <MenuItem
                          key={option}
                          value={option}
                          className={classes.font}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              ) : (
                ''
              )}
            </Grid>

            <Grid container spacing={1.5} className={clsx(classes.timeFrom)}>
              <Grid item xs={4} className={clsx(classes.font, classes.apply)}>
                Apply this rate to:
              </Grid>
              <Grid
                container
                className={clsx(classes.gridContainer, classes.timeFrom)}
              >
                <Grid
                  item
                  xs={3.5}
                  className={clsx(classes.font, classes.gridItem)}
                >
                  Time entries from
                </Grid>
                <Grid item xs={3.3}>
                  <DatePicker date={date} onChange={setDate} />
                </Grid>
                <Grid
                  item
                  xs={2}
                  className={clsx(classes.font, classes.gridItem)}
                >
                  onwards
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={1} className={classes.buttonBox}>
              <Grid item xs={3.5}>
                <Button className={classes.buttonWithoutBorders}>DELETE</Button>
              </Grid>
              <Grid item xs={3.5}>
                <Button
                  className={classes.buttonWithoutBorders}
                  onClick={() => handleClose(isOpen)}
                >
                  CANCEL
                </Button>
              </Grid>
              <Grid item xs={4.5}>
                <Button className={classes.save}>SAVE</Button>
              </Grid>
            </Grid>
          </div>
        </Box>
      </ThemeProvider>
    </Profile>
  );
};

export default RateModal;
