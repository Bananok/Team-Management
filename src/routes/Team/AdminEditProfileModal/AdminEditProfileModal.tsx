import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
  useMemo
} from 'react';

import {
  Grid,
  Button,
  Typography,
  FormControl,
  NativeSelect,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  TextField,
  Box,
  Avatar,
  IconButton,
  InputAdornment,
  createTheme,
  ThemeProvider,
  FormHelperText
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import Archive from '@mui/icons-material/Archive';
import BorderColor from '@mui/icons-material/BorderColor';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Add } from '@mui/icons-material';

// Icons
import pencil from 'assets/icons/pencil-square.svg';

// Types
import { User } from 'types/user';
import { IMemberPatch } from 'types/member';
import { ContractCurrencyVariant } from 'types/rate';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Stores
import { refreshMember } from 'api/members';
import rateStore from 'stores/RateStore';

// Components
import RateModal from './RateModal';

// Styles
import classes from './AdminEditProfileModal.module.scss';

interface IProps {
  item: User;
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const AdminEditProfile: FC<IProps> = ({ item, isOpen, setOpen }) => {
  const [name, setFullName] = useState<string>(item.name);
  const [email, setEmail] = useState<string>(item.email);
  const [defaultLevel, setLevel] = useState<string | undefined>(
    item.defaultLevel
  );
  const [defaultExpertize, setExpertize] = useState<string | undefined>(
    item.defaultExpertize
  );
  const [defaultLegalStatus, setDefaultLegalStatus] = useState<
    string | undefined
  >(item.defaultLegalStatus);
  const [status, setWorkStatus] = useState<string | undefined>(item.status);
  const [contractCurrency, setContractCurrency] = useState<string>(
    ContractCurrencyVariant.rub
  );
  const [role, setUserRole] = useState<string>(item.role);
  const [phone, setPhone] = useState<string | undefined>(item.phone);
  const [defaultRate, setRate] = useState<number>(Number(item.defaultRate));
  const [avatar, setAvatar] = useState<string>(' ');
  const [salary, setSalary] = useState<number>(40000);
  const [defaultWeeklyCapacity, setWeeklyCapacity] = useState<number>(
    Number(item.defaultWeeklyCapacity)
  );
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [rateIsEdit, setRateIsEdit] = useState<boolean>(false);
  const [salaryIsEdit, setSalaryIsEdit] = useState<boolean>(false);

  const calculateRuble = useMemo(
    () => (Number(defaultRate) * rateStore.rate).toFixed(2),
    [defaultRate]
  );

  const handleUpdateBackend = useCallback((member: IMemberPatch) => {
    refreshMember(member);
  }, []);

  const handleUpdate = useCallback(() => {
    setFullName(item.name);
    setEmail(item.email);
    setLevel(item.defaultLevel);
    setExpertize(item.defaultExpertize);
    setContractCurrency(contractCurrency);
    setDefaultLegalStatus(item.defaultLegalStatus);
    setUserRole(item.role);
    setRate(Number(item.defaultRate));
    setWeeklyCapacity(Number(item.defaultWeeklyCapacity));
    setWorkStatus(item.status);
  }, [item]);

  useEffect(() => {
    if (isOpen) {
      handleUpdate();
    }
  }, [item]);

  const handleClose = useCallback((cIsOpen: boolean) => {
    setOpen(!cIsOpen);
    setIsEdit(true);
  }, []);

  const handleEdit = useCallback((cIsEdit: boolean) => {
    setIsEdit(!cIsEdit);
  }, []);

  const handleEditSalary = useCallback((cIsEditSalary: boolean) => {
    setSalaryIsEdit(!cIsEditSalary);
  }, []);

  const handleEditRate = useCallback((cIsEditRate: boolean) => {
    setRateIsEdit(!cIsEditRate);
  }, []);

  const nameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  }, []);

  const symbolsForAvatar = useCallback((fullNameOnAvatar: string) => {
    const avatarName: string[] = fullNameOnAvatar.split(' ');
    const firstValue: string = avatarName[0] ? avatarName[0].charAt(0) : '';
    const secondValue: string = avatarName[1] ? avatarName[1].charAt(0) : '';
    const symbols: string = firstValue + secondValue;
    setAvatar(symbols);
  }, []);

  useEffect(() => {
    symbolsForAvatar(item.name);
  }, [item]);

  const emailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const levelChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLevel(e.target.value);
  }, []);

  const phoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  }, []);

  const expertizeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setExpertize(e.target.value);
  }, []);

  const currencyChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContractCurrency(e.target.value);
  }, []);

  const legalStatusChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDefaultLegalStatus(e.target.value);
  }, []);

  const userRoleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserRole(e.target.value);
  }, []);

  const rateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRate(Number(e.target.value));
  }, []);

  const workStatusChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWorkStatus(e.target.value);
  }, []);

  const salaryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(e.target.value));
  }, []);

  const weeklyCapacityChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setWeeklyCapacity(Number(e.target.value));
    },
    []
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f36d25'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Profile isOpen={isOpen} handleClose={handleClose}>
        <Grid container spacing={1} className={classes.pageName}>
          <Grid item xs={9}>
            <h2 className={classes.titleFont}>Member Profile</h2>
          </Grid>

          <Grid item xs={1}>
            <IconButton>
              <Archive />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => {
                handleEdit(isEdit);
              }}
            >
              <BorderColor />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => handleClose(isOpen)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>

        <Box className={classes.columnBox}>
          <Box className={classes.rowBox}>
            <Box className={classes.avatarLevelBox}>
              <Avatar
                className={classes.avatar}
                style={{ backgroundColor: item.colour }}
              >
                {avatar}
              </Avatar>
              <FormControl>
                <FormLabel className={classes.font}>Level</FormLabel>
                <RadioGroup className={classes.font} onChange={levelChange}>
                  <FormControlLabel
                    value="Intern"
                    control={<Radio />}
                    checked={defaultLevel === 'Intern'}
                    label={
                      <Typography className={classes.font}>Intern</Typography>
                    }
                    disabled={isEdit}
                  />
                  <FormControlLabel
                    value="Junior"
                    control={<Radio />}
                    checked={defaultLevel === 'Junior'}
                    label={
                      <Typography className={classes.font}>Junior</Typography>
                    }
                    disabled={isEdit}
                  />
                  <FormControlLabel
                    value="Middle"
                    control={<Radio />}
                    checked={defaultLevel === 'Middle'}
                    label={
                      <Typography className={classes.font}>Middle</Typography>
                    }
                    disabled={isEdit}
                  />
                  <FormControlLabel
                    value="High Middle"
                    control={<Radio />}
                    checked={defaultLevel === 'High Middle'}
                    label={
                      <Typography className={classes.font}>
                        High middle
                      </Typography>
                    }
                    disabled={isEdit}
                  />
                  <FormControlLabel
                    value="Senior"
                    control={<Radio />}
                    checked={defaultLevel === 'Senior'}
                    label={
                      <Typography className={classes.font}>Senior</Typography>
                    }
                    disabled={isEdit}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel className={classes.font}>Legal status</FormLabel>
                <RadioGroup onChange={legalStatusChange}>
                  <FormControlLabel
                    value="employee"
                    control={<Radio />}
                    checked={defaultLegalStatus?.toLowerCase() === 'employee'}
                    label={
                      <Typography className={classes.font}>Employee</Typography>
                    }
                    disabled={isEdit}
                  />
                  <FormControlLabel
                    value="contractor"
                    control={<Radio />}
                    checked={defaultLegalStatus?.toLowerCase() === 'contractor'}
                    label={
                      <Typography className={classes.font}>
                        Contractor
                      </Typography>
                    }
                    disabled={isEdit}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel className={classes.font}>Role</FormLabel>
                <RadioGroup onChange={userRoleChange}>
                  <FormControlLabel
                    value="USER"
                    control={<Radio />}
                    checked={role === 'USER'}
                    label={
                      <Typography className={classes.font}>User</Typography>
                    }
                    disabled={isEdit}
                  />
                  <FormControlLabel
                    value="MANAGER"
                    control={<Radio />}
                    checked={role === 'MANAGER'}
                    label={
                      <Typography className={classes.font}>
                        Project manager
                      </Typography>
                    }
                    disabled={isEdit}
                  />
                  <FormControlLabel
                    value="ADMIN"
                    control={<Radio />}
                    checked={role === 'ADMIN'}
                    label={
                      <Typography className={classes.font}>
                        Administrator
                      </Typography>
                    }
                    disabled={isEdit}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box className={classes.textFieldBox}>
              <Grid container className={classes.gridBox}>
                <Grid item xs={3}>
                  <Typography className={classes.font}>Full Name</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    variant="standard"
                    fullWidth
                    autoFocus
                    value={name}
                    onChange={nameChange}
                    InputProps={{
                      classes: {
                        root: classes.font
                      }
                    }}
                    disabled={isEdit}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.gridBox}>
                <Grid item xs={3}>
                  <Typography className={classes.font}>Phone</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    variant="standard"
                    fullWidth
                    autoFocus
                    value={phone}
                    InputProps={{
                      classes: {
                        root: classes.font
                      }
                    }}
                    disabled={isEdit}
                    onChange={phoneChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} className={classes.gridBox}>
                <Grid item xs={3}>
                  <Typography className={classes.font}>Email</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    variant="standard"
                    fullWidth
                    autoFocus
                    value={email}
                    onChange={emailChange}
                    InputProps={{
                      classes: {
                        root: classes.font
                      }
                    }}
                    disabled={isEdit}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} className={classes.gridBox}>
                <Grid item xs={3}>
                  <Typography className={classes.font}>Expertise</Typography>
                </Grid>
                <Grid item xs={9}>
                  <FormControl fullWidth onChange={expertizeChange}>
                    <NativeSelect
                      className={classes.font}
                      defaultValue={defaultExpertize}
                      disabled={isEdit}
                    >
                      <option value="PA">PA</option>
                      <option value="QA">QA</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Fullstack">Fullstack</option>
                      <option value="IOS">IOS</option>
                      <option value="Android">Android</option>
                      <option value="Flutter">Flutter</option>
                      <option value="Designer">Designer</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1} className={classes.gridBox}>
                <Grid item xs={3}>
                  <Typography className={classes.font}>Status</Typography>
                </Grid>
                <Grid item xs={9}>
                  <FormControl fullWidth onChange={workStatusChange}>
                    <NativeSelect
                      className={classes.orangeText}
                      defaultValue={status}
                      disabled={isEdit}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1} className={classes.gridBox}>
                <Grid item xs={6}>
                  <Typography className={classes.font}>
                    Weekly work capacity
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTimeIcon />
                        </InputAdornment>
                      ),
                      classes: {
                        root: classes.font
                      }
                    }}
                    variant="standard"
                    value={defaultWeeklyCapacity}
                    onChange={weeklyCapacityChange}
                    disabled={isEdit}
                  />
                </Grid>
              </Grid>

              {defaultLegalStatus ? (
                <>
                  <Grid container spacing={1} className={classes.gridBox}>
                    <Grid item xs={6}>
                      <Typography className={classes.font}>
                        Contract currency
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth onChange={currencyChange}>
                        <NativeSelect
                          className={classes.font}
                          defaultValue={contractCurrency}
                          disabled={isEdit}
                        >
                          <option value="RUB">RUB</option>
                          <option value="USD">USD</option>
                        </NativeSelect>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {contractCurrency === ContractCurrencyVariant.rub ? (
                    <Grid container spacing={1} className={classes.gridBox}>
                      <Grid item xs={3}>
                        <Typography className={classes.font}>
                          Hourly rate
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
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
                          value={defaultRate}
                          onChange={rateChange}
                          disabled={isEdit}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={1} className={classes.gridBox}>
                      <Grid item xs={3}>
                        <Typography className={classes.font}>
                          Hourly rate
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
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
                          disabled={isEdit}
                          variant="standard"
                          value={defaultRate}
                          onChange={rateChange}
                        />
                      </Grid>
                      <Grid item xs={3}>
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
                          disabled={isEdit}
                          variant="standard"
                          value={calculateRuble}
                          onChange={rateChange}
                        />
                      </Grid>
                      <Grid item xs={3}>
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
                          disabled={isEdit}
                          variant="standard"
                          value={rateStore.rate.toFixed(2)}
                          onChange={rateChange}
                        />
                      </Grid>
                    </Grid>
                  )}
                </>
              ) : (
                ''
              )}

              {defaultLegalStatus?.toLowerCase() === 'employee' ? (
                <Grid container spacing={1} className={classes.gridBox}>
                  <Grid item xs={4}>
                    <Typography className={classes.font}>
                      Monthly salary
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
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
                      disabled={isEdit}
                      variant="standard"
                      value={salary}
                      onChange={salaryChange}
                    />
                    <FormHelperText className={classes.helperText}>
                      net
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={3}>
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
                      value={salary}
                      disabled={isEdit}
                    />
                    <FormHelperText className={classes.helperText}>
                      gross
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => handleEditSalary(salaryIsEdit)}>
                      <img src={pencil} alt="pencil" />
                    </IconButton>
                  </Grid>
                </Grid>
              ) : (
                ''
              )}

              {defaultLegalStatus?.toLowerCase() === 'contractor' ? (
                <Grid item xs={3} className={classes.gridBox}>
                  <IconButton
                    onClick={() => handleEditRate(rateIsEdit)}
                    className={classes.addRateButton}
                  >
                    <Add className={classes.addIcon} />
                    <span className={classes.orangeText}>Add rate</span>
                  </IconButton>
                </Grid>
              ) : (
                ''
              )}
            </Box>
          </Box>
        </Box>

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
              handleUpdateBackend({
                userId: item.id,
                name,
                colour: item.colour,
                role,
                defaultRate,
                status,
                defaultLevel,
                defaultLegalStatus,
                defaultWeeklyCapacity,
                defaultExpertize
              })
            }
          >
            SAVE
          </Button>
        </Box>
        <RateModal
          defaultRate={item.defaultRate}
          isOpen={rateIsEdit}
          setOpen={setRateIsEdit}
          title="Edit rate"
          contractCurrency={contractCurrency}
          newRateTitle=" What is the new rate"
        />
        <RateModal
          defaultRate={item.defaultRate}
          isOpen={salaryIsEdit}
          setOpen={setSalaryIsEdit}
          title="Edit monthly salary net"
          contractCurrency={contractCurrency}
          newRateTitle=" What is the new monthly salary net"
        />
      </Profile>
    </ThemeProvider>
  );
};

export default AdminEditProfile;
