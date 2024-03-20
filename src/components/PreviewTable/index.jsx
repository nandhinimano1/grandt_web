import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

function PreviewTable({
  navigation,
  addnavigationall,
  showhash,
  showrowscount,
  ignoretitle,
  onclickformType,
  tableData,
  editableFields,
}) {
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [editingCell, setEditingCell] = useState({
    rowIndex: null,
    fieldName: null,
  });

  const handleKeyPress = (event, value) => {
    if (event.key === 'Enter') {
      onclickformType(value);
    }
  };

  const handleCellUpdate = (event, rowIndex, fieldName) => {
    const updatedValue = event.target.value;
    const updatedData = filteredTableData.map((row, index) =>
      index === rowIndex ? { ...row, [fieldName]: updatedValue } : row
    );
    setFilteredTableData(updatedData);

    setEditingCell({ rowIndex: null, fieldName: null });
  };

  const handleCellClick = (rowIndex, fieldName) => {
    if (editableFields?.includes(fieldName)) {
      setEditingCell({ rowIndex, fieldName });
    }
  };

  useEffect(() => {
    const formattedTableData = tableData.filter(
      (row) => row && Object.keys(row).length > 0
    );
    const headers =
      formattedTableData.length > 0 ? Object.keys(formattedTableData[0]) : [];
    setFilteredTableData(formattedTableData);
    setHeaders(headers);
  }, [tableData]);

  return (
    <TableContainer
      sx={{
        margin: 'auto',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 200px)',
      }}
    >
      {showrowscount && (
        <Typography component='div' sx={{ padding: 2 }}>
          {`${filteredTableData.length} Rows (including header)`}
        </Typography>
      )}
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            {showhash && <TableCell>#</TableCell>}
            {!ignoretitle &&
              headers
                .filter((header) => header !== 'details')
                .map((header) => <TableCell key={header}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTableData.map((row, rowIndex) => (
            <TableRow key={`row-hash#-${row + row[headers[0]]}`}>
              {showhash && (
                <TableCell
                  component='th'
                  scope='row'
                  data-testid={`hash-${rowIndex + 1}`}
                >
                  {rowIndex + 1}
                </TableCell>
              )}
              {headers.map((header) => {
                if (header !== 'details') {
                  const isEditable = editableFields?.includes(header);
                  const isEditing =
                    isEditable &&
                    editingCell.rowIndex === rowIndex &&
                    editingCell.fieldName === header;
                  const cellContent = isEditing ? (
                    <input
                      type='text'
                      defaultValue={row[header]}
                      onBlur={(event) =>
                        handleCellUpdate(event, rowIndex, header)
                      }
                    />
                  ) : (
                    <span onClick={() => handleCellClick(rowIndex, header)}>
                      {row[header] === '' ? 'click to edit data' : row[header]}
                    </span>
                  );
                  if (
                    addnavigationall ||
                    (navigation && header === headers[0])
                  ) {
                    return (
                      <TableCell
                        key={`${rowIndex}_${header}`}
                        data-testid={`cellContent_${rowIndex}_${header}`}
                      >
                        <button
                          style={{
                            textDecoration: 'underline',
                            border: 'none',
                            background: 'none',
                            padding: 0,
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            onclickformType(row[Object.keys(row)[0]])
                          }
                          onKeyDown={(event) =>
                            handleKeyPress(event, row[header])
                          }
                        >
                          {cellContent}
                        </button>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      key={`${rowIndex}_${header}`}
                      data-testid={`cellContents_${rowIndex}_${header}`}
                    >
                      {cellContent}
                    </TableCell>
                  );
                }
                return null;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PreviewTable.defaultProps = {
  navigation: false,
  addnavigationall: false,
  showhash: false,
  showrowscount: false,
  ignoretitle: false,
  onclickformType: () => {},
};

PreviewTable.propTypes = {
  navigation: PropTypes.bool,
  addnavigationall: PropTypes.bool,
  showhash: PropTypes.bool,
  showrowscount: PropTypes.bool,
  ignoretitle: PropTypes.bool,
  onclickformType: PropTypes.func,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  editableFields: PropTypes.arrayOf(PropTypes.string),
};

export default PreviewTable;
