import React, { FC, useState, useCallback } from 'react';

import {
  Grid,
  TextField,
  Button,
  Chip,
  InputAdornment,
  List,
  ListItem
} from '@mui/material';

// Icons
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Components
import SetNewBillableRate from 'components/SetNewBillableRateModal';

// Stores
import rateStore from 'stores/RateStore';

// Types
import { IRate } from 'types/rate';

// Styles
import classes from './ListBillableRateUSD.module.scss';

export interface IBillableList {
  listItem: IRate[];
  checked: boolean;
}

const ListBillableRate: FC<IBillableList> = ({ listItem, checked }) => {
  const [onSetClick, setOnSetClick] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<IRate>(listItem[0]);

  const dollarChange = (item: IRate) => {
    return (Number(item.rate) / rateStore.rate).toFixed(2);
  };

  const handleOnClick = useCallback((item: IRate, cIsButtonClick: boolean) => {
    setCurrentItem(item);
    setOnSetClick(!cIsButtonClick);
  }, []);

  return (
    <List className={classes.list}>
      {listItem.map((item) => (
        <ListItem key={item.id} component="div" disableGutters>
          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={3}>
              <Chip
                label={item.expertise}
                className={classes.chipColor}
                variant="filled"
              />
            </Grid>
            <Grid item xs={2}>
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
                disabled
                value={item.rate}
                variant="standard"
              />
            </Grid>

            {checked ? (
              <Grid item xs={2}>
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
                  value={dollarChange(item)}
                  disabled
                />
              </Grid>
            ) : (
              ''
            )}

            {checked ? (
              <Grid item xs={2}>
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
            <Grid item xs={2}>
              <Button
                onClick={() => {
                  handleOnClick(item, onSetClick);
                }}
              >
                EDIT
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      ))}
      <SetNewBillableRate
        item={currentItem}
        isOpen={onSetClick}
        setOpen={setOnSetClick}
        checked={checked}
      />
    </List>
  );
};
export default ListBillableRate;
