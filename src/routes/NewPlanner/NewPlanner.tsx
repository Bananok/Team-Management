import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useMemo } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import plannerStore from 'stores/PlannerStore';
import PlannerSubItem from './PlannerSubItem';
import './NewPlanner.scss';

const NewPlanner: FC = () => {
  const { users, openedUsers, getPlannerUsers, getPlannerUserProjects } =
    plannerStore;
  const testGroups = useMemo(
    () =>
      users.map((user) => {
        return {
          title: user.isProject ? (
            <PlannerSubItem project={user.name} />
          ) : (
            <div
              onClick={() => {
                getPlannerUserProjects(user.id);
              }}
              style={{ cursor: 'pointer' }}
            >
              {user.name}
            </div>
          ),
          ...user
        };
      }),
    [users]
  );
  useEffect(() => {
    getPlannerUsers();
  }, []);
  const items = [
    {
      id: 1,
      group: 2,
      title: 'random',
      start_time: new Date(2022, 0, 1, 1),
      end_time: new Date(2022, 0, 8, 2),
      canMove: true,
      canResize: false,
      canChangeGroup: false
    }
  ];
  const newItems = testGroups.filter(
    (group) =>
      !group.isProject || openedUsers.some((user) => user.userId !== group.id)
  );

  return (
    <div>
      <Timeline
        groups={newItems}
        items={items}
        canMove
        canResize="both"
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        defaultTimeStart={new Date(2022, 0, 1)}
        defaultTimeEnd={new Date(2023, 5, 2)}
      />
    </div>
  );
};

export default observer(NewPlanner);
