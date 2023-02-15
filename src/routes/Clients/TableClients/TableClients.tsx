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

// Types
import { IClient, WorkStatusVariant } from 'types/client';

// Images
import ghost from 'assets/icons/ghost.png';

// Stores
import clientsStore from 'stores/ClientsStore';

// Components
import TableFooter from 'components/TableFooter';
import EmptyTableBody from 'components/EmptyTableBody';
import Loading from 'components/Loading';
import DropdownIndicator from 'components/DropdownIndicator';
import ClientProfileModal from '../ClientProfileModal';

// Styles
import classes from './TableClients.module.scss';

export interface TableViewProps {
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

const TableClients: FC<TableViewProps> = ({ activeTab }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IClient | null>(null);

  const { loading, filteredClients, sort, sortDir } = clientsStore;

  const clients = useMemo(() => {
    if (activeTab === 0) {
      return filteredClients;
    }

    if (activeTab === 2) {
      return filteredClients.filter((client) => client.status === 'Archived');
    }

    return filteredClients.filter((client) => client.status === 'Active');
  }, [activeTab, filteredClients]);

  useEffect(() => {
    clientsStore.loadClients();
  }, []);

  const setOnClickRow = useCallback((row: IClient, index: number) => {
    setSelectedRow(row);
    setIsOpen(!isOpen);
    setSelectedIndex(index);
  }, []);

  return (
    <div className={classes.wrapper}>
      <TableContainer
        className={clsx(classes.container, {
          [classes.undefinedRowsContainer]: !clients || clients.length === 0
        })}
      >
        <Table aria-label="a dense table" className={classes.table}>
          <TableHead
            className={clsx({
              [classes.undefinedRowsHeader]: !clients || clients.length === 0
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
                  onClick={() => clientsStore.setSort('legalName')}
                  IconComponent={() =>
                    changeArrow(sortDir, sort === 'legalName')
                  }
                >
                  Company Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  onClick={() => clientsStore.setSort('contactPerson')}
                  IconComponent={() =>
                    changeArrow(sortDir, sort === 'contactPerson')
                  }
                >
                  Contact Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  onClick={() => clientsStore.setSort('email')}
                  IconComponent={() => changeArrow(sortDir, sort === 'email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                Projects Name
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
              clients
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      className={clsx(classes.tableRow, {
                        [classes.tableRowOnClick]: selectedIndex === index + 1
                      })}
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
                            row.status === WorkStatusVariant.Archived,
                          [classes.typography]: row
                        })}
                      >
                        {getNumberByIndexAndPage(index, page, rowsPerPage)}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.Archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.legalName}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.Archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.contactPerson}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.Archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.Archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.projects?.map((project) => (
                          <span key={project.name}>
                            <Chip
                              label={project.name}
                              style={{
                                backgroundColor: project?.colour
                              }}
                              className={clsx(classes.chipTypography, {
                                [classes.inactiveChip]:
                                  row.status === WorkStatusVariant.Archived
                              })}
                            />{' '}
                          </span>
                        ))}
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter
        rowsLength={clients?.length}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      {!clients && !loading ? (
        <div>
          <EmptyTableBody
            image={<img src={ghost} alt="ghost" />}
            text="No clients added. Add someone!"
          />
        </div>
      ) : null}
      {selectedRow ? (
        <ClientProfileModal
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

export default observer(TableClients);
