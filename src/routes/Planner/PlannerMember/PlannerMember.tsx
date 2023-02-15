import React, { FC, useState, useEffect } from 'react';
import clsx from 'clsx';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Stores
import projectsStore from 'stores/ProjectsStore';

// Types
import type { User } from 'types/user';
import { IProject } from 'types/project';

// Components
import PlannerPersonModal from 'components/PlannerPersonModal';
import MemberAvatar from 'components/MemberAvatar';
import PlannerAssignment from '../PlannerAssignment';

// Styles
import classes from './PlannerMember.module.scss';

interface PlannerMemberProps {
  user: User;
  isActive: boolean;
  setActive: (isActive: boolean) => void;
  project?: IProject;
  isButton?: boolean;
}

const PlannerMember: FC<PlannerMemberProps> = ({
  user,
  project,
  isActive,
  isButton,
  setActive
}) => {
  const { name, role, colour } = user;

  const [isActiveAddProject, setActiveAddProject] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    projectsStore.loadProjects();
  }, []);

  return project ? (
    <div
      className={clsx(classes.projectItem, {
        [classes.activeArrow]: isActive
      })}
    >
      {isButton ? (
        <div className={classes.buttonItem}>
          <button
            onClick={() => setActiveAddProject(true)}
            type="button"
            className={classes.buttonAsign}
          >
            Assign to project
          </button>
        </div>
      ) : (
        project.name
      )}
      <PlannerAssignment
        active={isActiveAddProject}
        setActive={setActiveAddProject}
        user={user}
      />
    </div>
  ) : (
    <div className={classes.userItem}>
      <MemberAvatar fullName={name} userRole={role} color={colour} />
      <div className={classes.textItem}>
        <p className={classes.name}>{name}</p>
        <p className={classes.role}>frontend, junior</p>
      </div>
      <button
        type="button"
        className={classes.buttonDot}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertIcon className={classes.dot} fontSize="inherit" />
      </button>
      <PlannerPersonModal
        user={user}
        isOpen={isOpen}
        setOpen={setIsOpen}
        title="Edit person"
      />
      <button
        type="button"
        onClick={() => setActive(!isActive)}
        className={classes.buttonArrow}
      >
        <KeyboardArrowDownIcon
          className={clsx(classes.arrow, {
            [classes.activeArrow]: isActive
          })}
          fontSize="inherit"
        />
      </button>
    </div>
  );
};

export default PlannerMember;
