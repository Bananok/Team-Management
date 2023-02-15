import React, { FC, ReactElement, ReactNode } from 'react';

import { Box, Modal } from '@mui/material';

// Styles
import classes from './ProfileLayout.module.scss';

interface IProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose?: (cIsOpen: boolean) => void;
}

const Profile: FC<IProps> = ({
  children,
  isOpen,
  handleClose
}): ReactElement => {
  return (
    <Modal open={isOpen} onClose={handleClose} className={classes.modal}>
      <Box className={classes.paper}>{children}</Box>
    </Modal>
  );
};

export default Profile;
