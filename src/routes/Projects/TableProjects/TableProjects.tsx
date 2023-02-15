import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material';

// Images
import box from 'assets/icons/box.png';
import calendar from 'assets/icons/calendar.svg';

// Types
import {
  ContractStatusVariant,
  IProject,
  WorkStatusVariant
} from 'types/project';

// Stores
import clientsStore from 'stores/ClientsStore';
import projectsStore from 'stores/ProjectsStore';

// Components
import TableFooter from 'components/TableFooter';
import EmptyTableBody from 'components/EmptyTableBody';
import Loading from 'components/Loading';
import DropdownIndicator from 'components/DropdownIndicator';
import ProjectAdminModal from '../ProjectAdminModal';

// Styles
import classes from './TableProjects.module.scss';

interface TableProjectsProps {
  activeTab: number;
}

const changeArrow = (sortDir: 1 | -1, active: boolean) => {
  return <DropdownIndicator sortDir={sortDir} active={active} />;
};

export const getNumberByIndexAndPage = (
  index: number,
  page: number,
  rowsPerPage: number
) => {
  return page === 0 ? index + 1 : index + 1 + page * rowsPerPage;
};

const TableProjects: FC<TableProjectsProps> = ({ activeTab }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedRow, setSelectedRow] = useState<IProject | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { loading, filteredProjects, sort, sortDir } = projectsStore;
  const projects = useMemo(() => {
    if (activeTab === 0) return filteredProjects;

    if (activeTab === 2)
      return filteredProjects?.filter(
        (project) => project.contractStatus === 'Archived'
      );

    return filteredProjects?.filter(
      (project) =>
        project.contractStatus !== 'Archived' &&
        project.contractStatus !== 'N/A'
    );
  }, [activeTab, filteredProjects]);

  useEffect(() => {
    clientsStore.loadClients();
  }, []);

  useEffect(() => {
    projectsStore.loadProjects();
  }, []);

  const dateFormat = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const setOnClickRow = useCallback((row: IProject, index: number) => {
    setSelectedIndex(index);
    setSelectedRow(row);
    setIsOpen(!isOpen);
  }, []);

  return (
    <div className={classes.wrapper}>
      <TableContainer
        className={clsx(classes.container, {
          [classes.undefinedRowsContainer]: !projects || projects.length === 0
        })}
      >
        <Table aria-label="a dense table" className={classes.table}>
          <TableHead
            className={clsx({
              [classes.undefinedRowsHeader]: !projects || projects.length === 0
            })}
          >
            <TableRow
              sx={{
                '.MuiTableCell-root': {
                  borderBottom: 'none'
                }
              }}
            >
              <TableCell align="left" className={classes.tableCellHead}>
                №
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  IconComponent={() => changeArrow(sortDir, sort === 'name')}
                  onClick={() => projectsStore.setSort('name')}
                >
                  Project Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                Client
              </TableCell>
              <TableCell align="left" className={classes.tableCellDate}>
                <TableSortLabel
                  onClick={() => projectsStore.setSort('startAt')}
                  IconComponent={() => changeArrow(sortDir, sort === 'startAt')}
                >
                  Start date
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellDate}>
                <TableSortLabel
                  onClick={() => projectsStore.setSort('endAt')}
                  IconComponent={() => changeArrow(sortDir, sort === 'endAt')}
                >
                  End date
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  onClick={() => projectsStore.setSort('manager')}
                  IconComponent={() => changeArrow(sortDir, sort === 'manager')}
                >
                  Manager
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  onClick={() => projectsStore.setSort('contractStatus')}
                  IconComponent={() =>
                    changeArrow(sortDir, sort === 'contractStatus')
                  }
                >
                  Contract Status
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            className={clsx({
              [classes.tableBodyLoading]: loading,
              [classes.tableBody]: !loading
            })}
          >
            {loading ? (
              <Loading table />
            ) : (
              projects
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      className={clsx(classes.tableRow, {
                        [classes.tableRowOnClick]: selectedIndex === index + 1
                      })}
                      hover
                      key={row.name}
                      onClick={() => setOnClickRow(row, index + 1)}
                      sx={{
                        '.MuiTableCell-root': {
                          borderBottom: 'none'
                        }
                      }}
                    >
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                      >
                        {getNumberByIndexAndPage(index, page, rowsPerPage)}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                        style={{ color: row.colour }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {clientsStore.clients.map((client) =>
                          client.id === row.clientId ? client.legalName : ''
                        )}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.startAt ? (
                          <span className={classes.dateWrapper}>
                            <img src={calendar} alt="calendar icon" />
                            {dateFormat(row.startAt)}
                          </span>
                        ) : (
                          <span>-</span>
                        )}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.endAt ? (
                          <span className={classes.dateWrapper}>
                            <img src={calendar} alt="calendar icon" />
                            {dateFormat(row.endAt)}
                          </span>
                        ) : (
                          <span>-</span>
                        )}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {!row.manager ? 'n/a' : row.manager}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.contractStatus?.toLowerCase() === 'n/a' ? (
                          <Chip
                            label={row.contractStatus.toLowerCase()}
                            className={clsx(classes.chipTypography, {
                              [classes.na]:
                                row.contractStatus === ContractStatusVariant.na
                            })}
                          />
                        ) : (
                          <Chip
                            label={row.contractStatus}
                            className={clsx(classes.chipTypography, {
                              [classes.signing]:
                                row.contractStatus ===
                                ContractStatusVariant.signing,
                              [classes.approval]:
                                row.contractStatus ===
                                ContractStatusVariant.approval,
                              [classes.archived]:
                                row.contractStatus ===
                                ContractStatusVariant.archived,
                              [classes.na]:
                                row.contractStatus === ContractStatusVariant.na
                            })}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading ? (
        <TableFooter
          rowsLength={projects?.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      ) : (
        ''
      )}
      {!filteredProjects && !loading ? (
        <div>
          <EmptyTableBody
            image={<img src={box} alt="box" />}
            text="No projects added. Add someone!"
          />
        </div>
      ) : null}
      {selectedRow ? (
        <ProjectAdminModal
          item={selectedRow}
          isOpen={isOpen}
          setOpen={setIsOpen}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default observer(TableProjects);
