import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Paper, Grid } from '@mui/material';

function WarningsErrorsFound({ warningsErrors, onSelect }) {
  return (
    <Paper style={{ padding: '10px', marginTop: '20px', marginBottom: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List
            component='nav'
            style={{ maxHeight: '120px', overflow: 'scroll' }}
          >
            {warningsErrors.map((warningError, index) => (
              <ListItem
                key={warningError.code}
                onClick={() => onSelect(warningError)}
              >
                <ListItemText
                  primary={`${warningError.code} - ${warningError.message}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}
WarningsErrorsFound.propTypes = {
  warningsErrors: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default WarningsErrorsFound;
