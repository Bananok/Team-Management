import { useFormik } from 'formik';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { NativeSelect } from '@mui/material';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DatePicker from 'react-datepicker';
import IconButton from '@mui/material/IconButton';

// Components
import Profile from 'layouts/ProfileLayout';

// Icons
import { ReactComponent as CopyItem } from 'assets/icons/copyItem.svg';
import { ReactComponent as Calendar } from 'assets/icons/calendar.svg';

// Types
import { AssigmentUser } from 'types/planner';
import { User } from 'types/user';

// Stores
import rateStore from 'stores/RateStore';
import plannerStore from 'stores/PlannerStore';
import membersStore from 'stores/MembersStore';
import projectsStore from 'stores/ProjectsStore';

// Utils
import { getNumberOfDays } from 'utils/NumberOfDays';

// Styles
import classes from './PlannerAssignment.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

interface PlannerAssignmentProps {
  active: boolean;
  setActive: (active: boolean) => void;
  user: User;
}

const PlannerAssignment: FC<PlannerAssignmentProps> = ({
  active,
  setActive,
  user
}) => {
  const expetizes = [
    'PA',
    'QA',
    'Fullstack',
    'Designer',
    'Frontend',
    'Flutter',
    'IOS',
    'Android',
    'Backend'
  ];
  const { members } = membersStore;
  const { projects } = projectsStore;

  const plannerUsers = useMemo(
    () => members.filter((member) => member.hasPlanner),
    [members]
  );

  const {
    id,
    name,
    defaultRate,
    defaultExpertize,
    defaultWeeklyCapacity,
    workDays
  } = user;

  const [dateRange, setDateRange] = useState<(Date | null)[]>([
    new Date(),
    new Date()
  ]);
  const [firstDate, secondDate] = dateRange;

  const handleClose = useCallback((cIsOpen: boolean) => {
    setActive(!cIsOpen);
  }, []);

  const formik = useFormik({
    initialValues: {
      userId: id,
      projectId: projects?.length ? projects[0].id : '',
      rate: defaultRate,
      expertize: defaultExpertize,
      dailyHours: defaultWeeklyCapacity / workDays.length,
      startAt: new Date().toISOString(),
      endAt: new Date().toISOString()
    },
    onSubmit: (assignmentUser: AssigmentUser) => {
      plannerStore.assignmentPlannerUser({
        ...assignmentUser,
        startAt: firstDate?.toISOString() || formik.values.startAt,
        endAt: secondDate?.toISOString() || formik.values.endAt
      });
    }
  });

  const totalHours = useMemo(
    () =>
      formik.values.dailyHours * (getNumberOfDays(firstDate, secondDate) + 1),
    [formik.values.dailyHours, firstDate, secondDate]
  );
  const rateDollars = useMemo(
    () => formik.values.rate / rateStore.rate,
    [formik.values.rate, rateStore.rate]
  );

  if (!active) {
    return null;
  }
  return (
    <Profile isOpen={active} handleClose={handleClose}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>Assignment</div>
        <IconButton onClick={() => handleClose(active)}>
          <CloseIcon className={classes.closeItem} />
        </IconButton>
      </div>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <div className={classes.inputWrapper}>
          <div className={classes.label}>Member name</div>
          <NativeSelect
            name="name"
            className={classes.formItem}
            defaultValue={name}
          >
            <option className={classes.option} value="Placeholder">
              Placeholder
            </option>
            {plannerUsers.map((member) => (
              <option
                key={member.id}
                className={classes.option}
                value={member.name}
              >
                {member.name}
              </option>
            ))}
          </NativeSelect>
          <CopyItem className={classes.valuteIcon} />
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.label}>Project name</div>
          <NativeSelect
            name="projectId"
            className={classes.formItem}
            defaultValue=""
            value={formik.values.projectId}
            onChange={formik.handleChange}
          >
            {projects
              ? projects.map((project) => (
                  <option
                    key={project.id}
                    className={classes.option}
                    value={project.id}
                  >
                    {project.name}
                  </option>
                ))
              : ''}
          </NativeSelect>
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.label}>Client</div>
          <input
            name="client"
            className={classes.formItem}
            value={projects?.length ? projects[0]?.name : ''}
            disabled
          />
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.label}>Billable rate</div>
          <div className={classes.valuteItem}>
            <CurrencyRubleIcon
              className={classes.valuteIcon}
              fontSize="small"
            />
            <input
              type="number"
              name="rate"
              onChange={formik.handleChange}
              className={classes.valute}
              value={formik.values.rate}
            />
          </div>
          <div className={classes.valuteItem}>
            <AttachMoneyIcon className={classes.valuteIcon} fontSize="small" />
            <input
              type="number"
              name="rateDollar"
              onChange={formik.handleChange}
              className={classes.valute}
              value={rateDollars}
            />
          </div>
          <div className={classes.valuteItem}>
            <CurrencyExchangeIcon
              className={classes.valuteIcon}
              fontSize="small"
            />
            <input
              type="number"
              name="exchangeRate"
              onChange={formik.handleChange}
              className={classes.exchangeRate}
              value={rateStore.rate}
            />
          </div>
          <div />
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.label}>Expertize</div>
          <NativeSelect
            name="expertize"
            onChange={formik.handleChange}
            className={classes.formItem}
            defaultValue={formik.values.expertize}
          >
            {expetizes.map((expetize) => (
              <option
                key={expetize}
                className={classes.option}
                value={expetize}
              >
                {expetize}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.label}>Hours/Day</div>
          <input
            type="number"
            name="dailyHours"
            onChange={formik.handleChange}
            className={classes.hoursItem}
            value={formik.values.dailyHours}
          />
          <div className={classes.smallLabel}>100% of 8 h/d</div>
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.label}>Total Hours</div>
          <input
            type="number"
            name="totalHours"
            className={classes.hoursItem}
            value={totalHours}
          />
          <div className={classes.smallLabel}>across 22 days</div>
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.label}>Date</div>
          <DatePicker
            selectsRange
            className={classes.calendar}
            startDate={firstDate}
            endDate={secondDate}
            onChange={(update: (Date | null)[]) => {
              setDateRange(update);
            }}
            isClearable
          />
          <Calendar />
        </div>
        <div className={classes.buttons}>
          <button className={classes.button} type="button">
            DELETE
          </button>
          <button
            onClick={() => setActive(false)}
            className={classes.button}
            type="button"
          >
            CANCEL
          </button>
          <button className={classes.fullButton} type="submit">
            SAVE
          </button>
        </div>
      </form>
    </Profile>
  );
};

export default observer(PlannerAssignment);
