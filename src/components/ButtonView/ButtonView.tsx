import React, { FC, useCallback } from 'react';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

// Styles
import classes from './ButtonView.module.scss';

// Components
import AddMember from '../AddMemberModal';
import AddProjectModal from '../AddProjectModal';

enum ButtonLabels {
  projects = 'Add project',
  team = 'Add members',
  clients = 'Add client'
}

interface ButtonProps {
  label: string;
  isButtonClick: boolean;
  setIsButtonClick: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ButtonView: FC<ButtonProps> = ({
  label,
  isButtonClick,
  setIsButtonClick
}) => {
  const handleOnClick = useCallback((cIsButtonClick: boolean) => {
    setIsButtonClick(!cIsButtonClick);
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOnClick(isButtonClick)}
        className={classes.button}
      >
        <Add className={classes.addIcon} />
        <span className={classes.text}>{label}</span>
      </Button>
      {label === ButtonLabels.team ? (
        <AddMember isOpen={isButtonClick} setOpen={setIsButtonClick} />
      ) : (
        ''
      )}
      {label === ButtonLabels.projects ? (
        <AddProjectModal isOpen={isButtonClick} setOpen={setIsButtonClick} />
      ) : (
        ''
      )}
    </div>
  );
};

export default ButtonView;
