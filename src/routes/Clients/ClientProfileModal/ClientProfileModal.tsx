import React, {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  useCallback
} from 'react';
import {
  Grid,
  Box,
  TextField,
  Typography,
  IconButton,
  Button,
  Chip,
  createTheme,
  ThemeProvider,
  MenuItem
} from '@mui/material';

// Api
import { refreshClient } from 'api/clients';

// Icons
import Close from '@mui/icons-material/Close';
import Archive from '@mui/icons-material/Archive';
import BorderColor from '@mui/icons-material/BorderColor';

// Types
import { IProject } from 'types/project';
import { IClient, IClientPatch, WorkStatusVariant } from 'types/client';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Styles
import classes from './ClientProfileModal.module.scss';

interface IProps {
  item: IClient;
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ClientProfile: FC<IProps> = ({ item, isOpen, setOpen }) => {
  const [id, setId] = useState<string>(item.id);

  const [legalName, setLegalName] = useState<string>(item.legalName);
  const [director, setDirector] = useState<string>(item.director);
  const [contactPerson, setContactPerson] = useState<string>(
    item.contactPerson
  );
  const [workStatus, setWorkStatus] = useState<WorkStatusVariant>(item.status);
  const [email, setEmail] = useState<string | undefined>(item.email);
  const [postalAddress, setPostalAddress] = useState<string>(
    item.postalAddress
  );
  const [legalAddress, setLegalAddress] = useState<string>(item.legalAddress);
  const [legalTin, setTin] = useState<string>(item.legalTin);
  const [legalOgrn, setOgrn] = useState<string>(item.legalOgrn);
  const [legalKpp, setKpp] = useState<string>(item.legalKpp);
  const [comment, setComment] = useState<string | undefined>(item.comment);
  const [projects, setProjects] = useState<IProject[]>(item.projects);
  const [isEdit, setIsEdit] = useState<boolean>(true);

  const handleUpdateBackend = useCallback((client: IClientPatch) => {
    refreshClient(client);
  }, []);

  const handleUpdate = useCallback(() => {
    setLegalName(item.legalName);
    setId(item.id);
    setDirector(item.director);
    setWorkStatus(item.status);
    setContactPerson(item.contactPerson);
    setEmail(item.email);
    setPostalAddress(item.postalAddress);
    setLegalAddress(item.legalAddress);
    setTin(item.legalTin);
    setOgrn(item.legalOgrn);
    setKpp(item.legalKpp);
    setComment(item.comment);
    setProjects(item.projects);
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

  const companyChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLegalName(e.target.value);
  }, []);

  const directorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirector(e.target.value);
  }, []);

  const workStatusChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWorkStatus(e.target.value as WorkStatusVariant);
  }, []);

  const contactChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContactPerson(e.target.value);
  }, []);

  const emailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const postalAddressChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPostalAddress(e.target.value);
    },
    []
  );

  const legalAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLegalAddress(e.target.value);
  }, []);

  const TINChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTin(e.target.value);
  }, []);

  const OGRNChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setOgrn(e.target.value);
  }, []);

  const KPPChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKpp(e.target.value);
  }, []);

  const commentChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }, []);

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
        <Grid container spacing={1} className={classes.gridBox}>
          <Grid item xs={9}>
            <h2 className={classes.nameContainer}>Client&#8242;s profile</h2>
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
        <Box className={classes.textFieldBox}>
          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={5}>
              <Typography className={classes.font}>Company name</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={legalName}
                onChange={companyChange}
                InputProps={{
                  classes: {
                    root: classes.font
                  },
                  disableUnderline: isEdit
                }}
                disabled={isEdit}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={5}>
              <Typography className={classes.font}>Status</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                id="standard-basic"
                variant="standard"
                color="primary"
                select
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={workStatusChange}
                value={workStatus}
                disabled={isEdit}
              >
                {Object.values(WorkStatusVariant).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={5}>
              <Typography className={classes.font}>Project</Typography>
            </Grid>
            <Grid item xs={7}>
              {projects.map((project) => (
                <Chip
                  label={project.name}
                  className={classes.project}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={5}>
              <Typography className={classes.font}>Director name</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={director}
                onChange={directorChange}
                InputProps={{
                  classes: {
                    root: classes.font
                  },
                  disableUnderline: isEdit
                }}
                disabled={isEdit}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={5}>
              <Typography className={classes.font}>Contact name</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={contactPerson}
                onChange={contactChange}
                InputProps={{
                  classes: {
                    root: classes.font
                  },
                  disableUnderline: isEdit
                }}
                disabled={isEdit}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={5}>
              <Typography className={classes.font}>Email</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={email}
                onChange={emailChange}
                InputProps={{
                  classes: {
                    root: classes.font
                  },
                  disableUnderline: isEdit
                }}
                disabled={isEdit}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={5}>
              <Typography className={classes.font}>Postal address</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={postalAddress}
                onChange={postalAddressChange}
                InputProps={{
                  classes: {
                    root: classes.font
                  },
                  disableUnderline: isEdit
                }}
                disabled={isEdit}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={5}>
              <Typography className={classes.font}>Legal address</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={legalAddress}
                onChange={legalAddressChange}
                InputProps={{
                  classes: {
                    root: classes.font
                  },
                  disableUnderline: isEdit
                }}
                disabled={isEdit}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={1}>
              <Typography className={classes.font}>TIN</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={legalTin}
                onChange={TINChange}
                InputProps={{
                  classes: {
                    root: classes.font
                  },
                  disableUnderline: isEdit
                }}
                disabled={isEdit}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.font}>OGRN</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={legalOgrn}
                onChange={OGRNChange}
                InputProps={{
                  classes: {
                    root: classes.font
                  },
                  disableUnderline: isEdit
                }}
                disabled={isEdit}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.font}>KPP</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={legalKpp}
                onChange={KPPChange}
                InputProps={{
                  classes: {
                    root: classes.font
                  },
                  disableUnderline: isEdit
                }}
                disabled={isEdit}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={5}>
              <Typography className={classes.font}>Comment</Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={comment}
                onChange={commentChange}
                InputProps={{
                  classes: {
                    root: classes.font
                  },
                  disableUnderline: isEdit
                }}
                disabled={isEdit}
              />
            </Grid>
          </Grid>
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
            onClick={() => {
              handleUpdateBackend({
                clientId: id,
                director,
                contactPerson,
                status: workStatus,
                legalTin,
                legalOgrn,
                legalKpp,
                legalAddress,
                postalAddress,
                legalName,
                projectsIds: projects.map((project) => project.id),
                comment: typeof comment === 'string' ? comment : undefined
              });
              handleClose(isOpen);
            }}
          >
            SAVE
          </Button>
        </Box>
      </ThemeProvider>
    </Profile>
  );
};
export default ClientProfile;
