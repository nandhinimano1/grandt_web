import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  TextField,
  MenuItem,
} from '@mui/material';
import apiservice from '../../../helper/apiservice';
import '../ResultSummary.css';

function Filter(props) {
  const {
    handleInputChange,
    handlessetfiletype,
    filetype,
    entityData,
    radioGroup,
  } = props;
  const [memberFirms, setMemberFirms] = useState([]);

  const handleSubmit = (e) => {
    // console.log(e.target.value);
  };

  const getMemberFirm = async () => {
    try {
      await apiservice
        .getmemberfirm()
        .then((response) => setMemberFirms(response.data))
        .catch((error) => console.error(error));
    } catch (error) {
      //  console.error(error);
    }
  };

  useEffect(() => {
    getMemberFirm();
  }, []);

  return (
    <FormControl
      component='form'
      onSubmit={(e) => handleSubmit(e)}
      fullWidth
      autoComplete='off'
    >
      <Grid container spacing={8}>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <FormControl fullWidth sx={{ marginBottom: '1%' }}>
              <InputLabel shrink>Member Firm</InputLabel>
              <TextField
                inputProps={{
                  id: 'memberFirmSelect',
                  'data-testid': 'memberFirmSelect',
                }}
                select
                fullWidth
                id='memberFirm'
                name='memberFirm'
                value={entityData.memberFirm}
                onChange={handleInputChange}
                margin='normal'
                variant='outlined'
              >
                {memberFirms.map((firm, index) => (
                  <MenuItem key={firm} value={firm}>
                    {firm}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <FormControl fullWidth sx={{ marginBottom: '1%' }}>
              <InputLabel shrink>Received From</InputLabel>
              <TextField
                inputProps={{
                  id: 'receivedFrom',
                  'data-testid': 'receivedFrom',
                }}
                margin='normal'
                fullWidth
                id='receivedFrom'
                name='receivedFrom'
                value={entityData.receivedFrom}
                onChange={handleInputChange}
                variant='outlined'
                type='email'
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <FormControl fullWidth sx={{ marginBottom: '1%' }}>
              <InputLabel shrink>Date from</InputLabel>
              <TextField
                inputProps={{
                  id: 'datefrom',
                  'data-testid': 'datefrom',
                }}
                margin='normal'
                fullWidth
                id='datefrom'
                name='datefrom'
                value={entityData.datefrom}
                onChange={handleInputChange}
                variant='outlined'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <FormControl fullWidth sx={{ marginBottom: '1%' }}>
              <InputLabel shrink>Date to</InputLabel>
              <TextField
                inputProps={{
                  id: 'dateto',
                  'data-testid': 'dateto',
                  min: entityData.from,
                }}
                margin='normal'
                fullWidth
                id='dateto'
                name='dateto'
                value={entityData.dateto}
                onChange={handleInputChange}
                variant='outlined'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component='legend'>Select File Type</FormLabel>
            <FormControl
              component='fieldset'
              fullWidth
              sx={{
                border: 1,
                borderRadius: 1,
                borderColor: '#EBEBE4',
                padding: 2,
                height: 'fit-content',
              }}
            >
              <RadioGroup
                row
                aria-label='fileType'
                name='fileType'
                value={filetype}
                onChange={(e) => handlessetfiletype(e.target.value)}
              >
                {radioGroup.map(({ label, value }, index) => (
                  <FormControlLabel
                    key={`index${label}`}
                    value={value}
                    control={
                      <Radio
                        inputProps={{
                          'data-testid': `radio-button-${value}`,
                        }}
                      />
                    }
                    label={label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
}

Filter.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handlessetfiletype: PropTypes.func.isRequired,
  filetype: PropTypes.string.isRequired,
  entityData: PropTypes.object.isRequired,
  radioGroup: PropTypes.array.isRequired,
};
export default Filter;
