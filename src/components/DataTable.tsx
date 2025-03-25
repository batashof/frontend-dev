import React, { useState } from 'react';

import { ArrowDropDown, ArrowDropUp, FilterAltOutlined } from '@mui/icons-material';
import {
  Box,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

import { Column, FiltersState } from '../types';
import ActiveFilters from './ActiveFilters';
import FilterMenu, { SelectedItems } from './FilterMenu';
import StatusChip from './StatusChip';

interface DataTableProps {
  data?: never[];
  columns: Column[];
  totalElements: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onSortChange?: (columnId: string, direction: 'asc' | 'desc' | 'none') => void;
  onRowClick?: (row: never) => void;
  onFilterChange?: (filters: FiltersState) => void;
}

const StyledTableContainer = styled(TableContainer)({
  maxHeight: 'calc(100vh - 200px)',
  overflowX: 'scroll'
});

const StyledTableCell = styled(TableCell)({
  whiteSpace: 'nowrap',
  border: 'none'
});

const StyledHeaderCell = styled(TableCell)<{ isSorted: boolean }>(({ isSorted }) => ({
  whiteSpace: 'nowrap',
  color: isSorted ? '#4A70CF' : 'inherit',
  padding: '6.5px 16px',
  border: 'none'
}));

const SortButton = styled(IconButton)({
  padding: 0,
  marginLeft: '8px'
});

const StyledTablePagination = styled(TablePagination)<any>({
  align: 'left',
  width: '100%'
});

const SortIconsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
});

const HeaderLabelContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
});

const DataTable: React.FC<DataTableProps> = ({
  data = [],
  columns,
  totalElements,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
  onRowClick,
  onFilterChange
}) => {
  const [sortConfig, setSortConfig] = useState<{
    columnId: string;
    direction: 'asc' | 'desc' | 'none';
  }>({
    columnId: '',
    direction: 'none'
  });

  const [filters, setFilters] = useState<FiltersState>({});
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<{
    columnId: string;
    anchorEl: HTMLElement | null;
  }>({
    columnId: '',
    anchorEl: null
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  const handleSort = (columnId: string) => {
    let newDirection: 'asc' | 'desc' | 'none' = 'asc';
    if (sortConfig.columnId === columnId) {
      if (sortConfig.direction === 'asc') {
        newDirection = 'desc';
      } else if (sortConfig.direction === 'desc') {
        newDirection = 'none';
      }
    }
    setSortConfig({ columnId, direction: newDirection });
    if (onSortChange) {
      onSortChange(columnId, newDirection);
    }
  };

  const handleFilterClick = (columnId: string, event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor({ columnId, anchorEl: event.currentTarget });
  };

  const handleFilterClose = () => {
    setFilterMenuAnchor({ columnId: '', anchorEl: null });
  };

  const handleFilterApply = (columnId: string, selectedItems: SelectedItems[]) => {
    const columnLabel = columns.find(col => col.id === columnId)?.label || columnId;
    const newFilters = {
      ...filters,
      [columnId]: selectedItems.map(item => ({ ...item, columnLabel }))
    };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
    handleFilterClose();
  };

  const handleRemoveFilter = (columnId: string, value?: string) => {
    const updatedFilters = { ...filters };
    updatedFilters[columnId] = updatedFilters[columnId].filter(item => item.value !== value);
    if (updatedFilters[columnId].length === 0) {
      delete updatedFilters[columnId];
    }
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const handleClearAllFilters = () => {
    setFilters({});
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  const renderSortIcons = () => (
    <SortIconsContainer>
      <ArrowDropUp sx={{ marginBottom: '-8px' }} />
      <ArrowDropDown sx={{ marginTop: '-8px' }} />
    </SortIconsContainer>
  );

  const renderSortIcon = (columnId: string) => {
    if (sortConfig.columnId !== columnId) {
      return renderSortIcons();
    }

    switch (sortConfig.direction) {
      case 'asc':
        return <ArrowDropUp />;
      case 'desc':
        return <ArrowDropDown />;
      default:
        return renderSortIcons();
    }
  };

  const renderCellContent = (row: never, column: Column) => {
    if (column.id === 'status') {
      return <StatusChip status={row[column.id]} />;
    }

    if (column.format) {
      return column.format(row[column.id], row);
    }

    return row[column.id];
  };

  return (
    <Box>
      <ActiveFilters
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onClearAllFilters={handleClearAllFilters}
      />

      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <StyledHeaderCell
                  key={column.id}
                  align={column.align || 'left'}
                  isSorted={sortConfig.columnId === column.id && sortConfig.direction !== 'none'}
                >
                  <HeaderLabelContainer>
                    <Box onClick={() => handleSort(column.id)}>
                      {column.label}
                      <SortButton size='small'>{renderSortIcon(column.id)}</SortButton>
                    </Box>
                    {column.filter && (
                      <IconButton
                        size='small'
                        onClick={event => handleFilterClick(column.id, event)}
                      >
                        <FilterAltOutlined
                          color={Object.keys(filters)?.includes(column.id) ? 'primary' : 'inherit'}
                        />
                      </IconButton>
                    )}
                  </HeaderLabelContainer>
                </StyledHeaderCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{ padding: 0, backgroundColor: 'transparent', border: 'none' }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: never, rowIndex: number) => (
              <TableRow
                key={rowIndex}
                hover
                onClick={() => onRowClick && onRowClick(row)}
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map(column => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align || 'left'}
                  >
                    {renderCellContent(row, column)}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <StyledTablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledTableContainer>

      {filterMenuAnchor.anchorEl && (
        <FilterMenu
          anchorEl={filterMenuAnchor.anchorEl}
          open={Boolean(filterMenuAnchor.anchorEl)}
          onClose={handleFilterClose}
          title={columns.find(col => col.id === filterMenuAnchor.columnId)?.label || ''}
          menuItems={columns.find(col => col.id === filterMenuAnchor.columnId)?.filter || []}
          selectedItems={filters[filterMenuAnchor.columnId] || []}
          onDone={selectedItems => handleFilterApply(filterMenuAnchor.columnId, selectedItems)}
        />
      )}
    </Box>
  );
};

export default DataTable;
