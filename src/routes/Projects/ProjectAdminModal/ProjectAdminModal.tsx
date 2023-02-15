import React, {
  FC,
  useState,
  ChangeEvent,
  useEffect,
  useCallback
} from 'react';

import dayjs, { Dayjs } from 'dayjs';

import {
  Grid,
  Box,
  TextField,
  Typography,
  IconButton,
  Button,
  FormControl,
  NativeSelect,
  createTheme,
  ThemeProvider,
  Switch,
  Fade,
  Chip,
  InputAdornment,
  Collapse,
  MenuItem
} from '@mui/material';

// Api
import { refreshProject } from 'api/projects';

// Icons
import Close from '@mui/icons-material/Close';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Types
import {
  ColourProjectVariant,
  ContractStatusVariant,
  IProject,
  WorkStatusVariant
} from 'types/project';
import { IRate } from 'types/rate';

// Components
import SetNewBillableRate from 'components/SetNewBillableRateModal';
import DatePicker from 'components/DatePicker';
import ListBillableRateUSD from 'components/ListBillableRateModalUSD';

// Stores
import rateStore from 'stores/RateStore';
import projectsStore from 'stores/ProjectsStore';
import clientsStore from 'stores/ClientsStore';
import membersStore from 'stores/MembersStore';

// Styles
import classes from './ProjectAdminModal.module.scss';

interface IProps {
  item: IProject;
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ProjectAdmin: FC<IProps> = ({ item, isOpen, setOpen }) => {
  const listItem: IRate[] = [
    {
      id: '1',
      expertise: 'PA',
      rate: 123,
      date: undefined,
      defaultValue: false
    },
    {
      id: '2',
      expertise: 'QA',
      rate: 110,
      date: undefined,
      defaultValue: true
    },
    {
      id: '3',
      expertise: 'QA',
      rate: 130,
      date: undefined,
      defaultValue: true
    },
    { id: '4', expertise: 'pa', rate: 123, date: undefined, defaultValue: true }
  ];

  const [name, setName] = useState<string>(item.name);
  const [clientId, setClientId] = useState<string>(item.clientId);
  const [manager, setManager] = useState<string>(item.manager);
  const [workStatus, setWorkStatus] = useState<string | undefined>(
    item.workStatus
  );
  const [contractStatus, setContractStatus] = useState<string | undefined>(
    item.contractStatus
  );
  const [colour, setColour] = useState<string | undefined>(item.colour);
  const [startAt, setStartAt] = useState<Dayjs | null>(dayjs(item.startAt));
  const [endAt, setEndAt] = useState<Dayjs | null>(dayjs(item.endAt));
  const [contractCurrency, setContractCurrency] = useState<string | undefined>(
    item.contractCurrency
  );
  const [isBillable, setIsBillable] = useState<boolean>(false);
  const [onSetClick, setOnSetClick] = useState<boolean>(false);
  const [buttonContractStatus, setButtonContractStatus] =
    useState<boolean>(true);

  const { clients } = clientsStore;
  const { members } = membersStore;

  const handleUpdateProject = useCallback((project: IProject) => {
    refreshProject(project);
  }, []);

  const handleUpdate = useCallback(() => {
    setName(item.name);
    setClientId(item.clientId);
    setManager(item.manager);
    setWorkStatus(item.workStatus);
    setContractStatus(item.contractStatus);
    setColour(item.colour);
    setStartAt(dayjs(item.startAt));
    setEndAt(dayjs(item.endAt));
    setContractCurrency(item.contractCurrency);
    setIsBillable(!isBillable);
  }, [item]);

  useEffect(() => {
    if (isOpen) {
      handleUpdate();
    }
  }, [item]);

  useEffect(() => {
    projectsStore.loadProjects();
    clientsStore.loadClients();
  }, []);

  const setNameByRow = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const clientChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setClientId(e.target.value);
  }, []);

  const managerChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setManager(e.target.value);
  }, []);

  const statusChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWorkStatus(e.target.value);
  }, []);

  const contractStatusChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setContractStatus(e.target.value);
    },
    []
  );

  const colorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setColour(e.target.value);
  }, []);

  const contractCurrencyChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setContractCurrency(e.target.value);
    },
    []
  );

  const billableChange = useCallback(() => {
    setIsBillable((prev) => !prev);
  }, []);

  const handleOnClick = useCallback((cIsButtonClick: boolean) => {
    setOnSetClick(!cIsButtonClick);
  }, []);

  const handleClose = useCallback((cIsOpen: boolean) => {
    setOpen(!cIsOpen);
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
        <Grid container spacing={1} className={classes.gridBox}>
          <Grid item xs={11}>
            <h2 className={classes.pageName}>Project settings</h2>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => handleClose(isOpen)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>

        <Box className={classes.textFieldBox}>
          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Project name</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={name}
                onChange={setNameByRow}
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Client</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="standard"
                select
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={clientChange}
                value={clientId}
              >
                {clients.map((option) => (
                  <MenuItem key={option.id} value={option.legalName}>
                    {option.legalName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Project manager</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="standard-basic"
                variant="standard"
                select
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={managerChange}
                value={manager}
              >
                {members
                  .filter((member) => member.role === 'MANAGER')
                  .map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Status</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="standard-basic"
                variant="standard"
                select
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={statusChange}
                value={workStatus}
              >
                {Object.values(WorkStatusVariant).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.font}>Contract status</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="standard-basic"
                variant="standard"
                select={buttonContractStatus}
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={contractStatusChange}
                value={contractStatus}
              >
                <MenuItem onClick={() => setButtonContractStatus(false)}>
                  <AddCircleOutlineIcon />
                  Add new contract status
                </MenuItem>
                {Object.values(ContractStatusVariant).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Color label</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="standard-basic"
                variant="standard"
                select
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={colorChange}
                value={colour}
              >
                {Object.values(ColourProjectVariant).map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    style={{ color: option }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>
                Link to legal archive
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Start date</Typography>
            </Grid>
            <Grid item xs={9}>
              <DatePicker date={startAt} onChange={setStartAt} />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.font}>End date</Typography>
            </Grid>
            <Grid item xs={9}>
              <DatePicker date={endAt} onChange={setEndAt} />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Billable rate</Typography>
            </Grid>
            <Grid item xs={3}>
              <Switch checked={isBillable} onChange={billableChange} />
            </Grid>
            <Grid item xs={6}>
              <Fade in={isBillable}>
                <Grid container spacing={1} className={classes.gridBox}>
                  <Grid item xs={7}>
                    <Typography className={classes.font}>
                      Contract currency
                    </Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <FormControl fullWidth onChange={contractCurrencyChange}>
                      <NativeSelect
                        className={classes.font}
                        defaultValue={contractCurrency}
                      >
                        <option value="Rubbles">Rubles</option>
                        <option value="USD">USD</option>
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </Fade>
            </Grid>
          </Grid>

          <Collapse in={isBillable}>
            <Grid container className={classes.gridBox}>
              <Grid item xs={12}>
                <Typography className={classes.font}>
                  Project billable rate
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ListBillableRateUSD
                  listItem={listItem}
                  checked={contractCurrency === 'USD'}
                />
              </Grid>
            </Grid>
          </Collapse>

          <Collapse in={isBillable}>
            <Grid container spacing={1} className={classes.gridBox}>
              <Grid item xs={3}>
                <Chip label="n/a" className={classes.chip} variant="filled" />
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
                    },
                    disableUnderline: true
                  }}
                  disabled
                  value={0}
                  variant="standard"
                />
              </Grid>

              {contractCurrency === 'USD' && (
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
                      },
                      disableUnderline: true
                    }}
                    variant="standard"
                    value={0}
                    disabled
                  />
                </Grid>
              )}

              {contractCurrency === 'USD' && (
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
                      },
                      disableUnderline: true
                    }}
                    variant="standard"
                    value={rateStore.rate}
                    disabled
                  />
                </Grid>
              )}

              <Grid item xs={2}>
                <Button
                  onClick={() => {
                    handleOnClick(onSetClick);
                  }}
                >
                  SET
                </Button>
                <SetNewBillableRate
                  item={listItem[0]}
                  isOpen={onSetClick}
                  setOpen={setOnSetClick}
                  checked={contractCurrency === 'USD'}
                />
              </Grid>
            </Grid>
          </Collapse>

          <Box className={classes.buttonBox}>
            <Button
              className={classes.cancel}
              onClick={() => handleClose(isOpen)}
            >
              CANCEL
            </Button>
            <Button
              className={classes.save}
              onClick={() =>
                handleUpdateProject({
                  id: item.id,
                  name,
                  startAt: '10',
                  endAt: '11',
                  hasActualContract: true,
                  colour,
                  manager,
                  clientId,
                  contractStatus,
                  workStatus,
                  contractCurrency
                })
              }
            >
              SAVE
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </Profile>
  );
};
export default ProjectAdmin;
