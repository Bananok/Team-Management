import React, { FC, SyntheticEvent, useCallback } from 'react';
import clsx from 'clsx';
import { Box, InputBase, Tab, Tabs } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Search } from '@mui/icons-material';

// Styles
import classes from './TabsView.module.scss';

interface TabsViewProps {
  placeholder?: string;
  tabs: string[];
  activeTab: number;
  setActiveTab: (newActiveTab: number) => void;
}

const TabsView: FC<TabsViewProps> = ({
  placeholder,
  tabs,
  activeTab,
  setActiveTab
}) => {
  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    },
    []
  );

  return (
    <Box
      className={clsx(classes.box, {
        [classes.boxWithoutBorder]: !placeholder
      })}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        className={classes.tabs}
        TabIndicatorProps={{ sx: { backgroundColor: '#f36d25' } }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={classes.itemButton}
            label={<span className={classes.tab}>{tab}</span>}
          />
        ))}
      </Tabs>
      <Box
        className={clsx(classes.inputBox, {
          [classes.removeItem]: !placeholder
        })}
      >
        <IconButton aria-label="search">
          <Search style={{ color: '#00000061' }} />
        </IconButton>
        <InputBase
          className={classes.inputBase}
          placeholder={placeholder}
          inputProps={{
            className: classes.font
          }}
        />
      </Box>
    </Box>
  );
};

export default TabsView;
