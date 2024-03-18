import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
  Grid,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import '../ResultSummary.css';
import PreviewTable from '../../PreviewTable';
import Filter from '../Filter';

const MemoizedPreviewTable = memo(PreviewTable);

function FileSummaryByMsg(props) {
  const {
    setRendercomponent,
    handleInputChange,
    handlessetfiletype,
    filetype,
    entityData,
    radioGroup,
  } = props;
  const [msgType, setMsgType] = useState('all');

  return (
    <Container component='main'>
      <Grid container spacing={5} marginBottom={8}>
        <Grid item xs={12}>
          <h1 className='alignCenter'>Data Profile - File summary by msg</h1>
        </Grid>
        <Grid item xs={12}>
          <Filter
            handleInputChange={handleInputChange}
            handlessetfiletype={handlessetfiletype}
            filetype={filetype}
            entityData={entityData}
            radioGroup={radioGroup}
          />
        </Grid>
        <Grid item xs={12}>
          <MemoizedPreviewTable
            tableData={[
              {
                'Member Firm': 7,
                'File type': 'Entity',
                'File name': 'aaaa.csv',
                'File id': 72,
                'Rcvd date': '2023-03-07',
                'Run date': '2023-03-07',
                Total: 2817,
                Pass: 2817,
                Fail: 2817,
              },
            ]}
            navigation
            onclickformType={(id) => {}}
          />
        </Grid>
        <Grid item xs={12} className='alignCenter'>
          <Button
            variant='outlined'
            style={{ marginRight: 10 }}
            onClick={() => {
              setRendercomponent('');
            }}
          >
            Back to results
          </Button>
          <Button variant='contained'>Full result Download</Button>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ m: 1 }} />
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}>
            <Typography>Select msg type to view</Typography>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Button variant='contained' color='primary' onClick={() => {}}>
              Refresh List
            </Button>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={9}>
            <RadioGroup
              row
              aria-label='fileType'
              name='fileType'
              value={msgType}
              onChange={(e) => {
                setMsgType(e.target.value);
              }}
            >
              {[
                { value: 'all', label: 'All' },
                { value: 'warnings', label: 'Warnings' },
                { value: 'errors', label: 'Errors' },
              ].map(({ label, value }, index) => (
                <FormControlLabel
                  key={`radio-${label}`}
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ m: 1 }} />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Selected MSG List
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={8}>
              <MemoizedPreviewTable
                tableData={[
                  {
                    'Msg ID': 'DRC-100',
                    Result: 'Warning',
                    'Msg Dec': 'Required field is missing',
                    'Rec cnt': '6',
                  },
                  {
                    'Msg ID': 'DRC-323',
                    Result: 'Warning',
                    'Msg Dec': 'Country field should match the valid ISO list',
                    'Rec cnt': '23',
                  },
                ]}
                navigation
                onclickformType={(id) => {
                  setRendercomponent('RecordswithError');
                }}
              />
            </Grid>
            <Grid item xs={4} sx={{ pt: '5%', pl: '5%' }}>
              <Typography>Warning</Typography>
              <Typography>Error</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
FileSummaryByMsg.propTypes = {
  setRendercomponent: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handlessetfiletype: PropTypes.func.isRequired,
  filetype: PropTypes.string.isRequired,
  entityData: PropTypes.object.isRequired,
  radioGroup: PropTypes.array.isRequired,
};

export default FileSummaryByMsg;
