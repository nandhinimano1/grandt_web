import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Button, Typography, Divider } from '@mui/material';
import '../ResultSummary.css';
import PreviewTable from '../../PreviewTable';
import Filter from '../Filter';
import WarningsErrorsFound from '../WarningsErrorsFound';

const MemoizedPreviewTable = memo(PreviewTable);
const warningsErrors = [
  { code: 'DRC-323', message: 'Country field should match the valid ISO list' },
  { code: 'DRC-100', message: 'Required field is missing' },
  { code: 'DRC-101', message: 'Some other message' },
  { code: 'DRC-102', message: 'Another message' },
];
function FileSummaryRecordswitherror(props) {
  const {
    setRendercomponent,
    handleInputChange,
    handlessetfiletype,
    filetype,
    entityData,
    radioGroup,
  } = props;

  const handleSelect = (warningError) => {
    console.warn(warningError);
  };
  return (
    <Container component='main'>
      <Grid container spacing={5} marginBottom={8}>
        <Grid item xs={12}>
          <h1 className='alignCenter'>Data Profile - Records with errors</h1>
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
            Back to MF file search
          </Button>
          <Button variant='contained'>Full result Download</Button>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ m: 1 }} />
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography>Warnings/Errors found</Typography>
          </Grid>
          <Grid item xs={8}>
            <WarningsErrorsFound
              warningsErrors={warningsErrors}
              onSelect={handleSelect}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Button variant='contained' color='primary' onClick={() => {}}>
              Refresh List
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ m: 1 }} />
        </Grid>

        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography variant='h6'>Current message selection</Typography>
          </Grid>
          <Grid item xs={12}>
            <MemoizedPreviewTable
              tableData={[
                {
                  ID: 'DRC-100',
                  Description: 'Required field is missing',
                  Type: 'Warning',
                },
              ]}
              onclickformType={(id) => {
                setRendercomponent('RecordswithError');
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mt: 10, mb: 10 }} />
          </Grid>
          <Grid item xs={12}>
            <MemoizedPreviewTable
              tableData={[
                {
                  'Row#': 1079,
                  'Entity Id': 939,
                  'Field name': 'entity_country',
                  'Field content': '',
                },
                {
                  'Row#': 1270,
                  'Entity Id': 93014,
                  'Field name': 'entity_country',
                  'Field content': '',
                },
                {
                  'Row#': 2336,
                  'Entity Id': 83872,
                  'Field name': 'entity_country',
                  'Field content': '',
                },
                {
                  'Row#': 2337,
                  'Entity Id': 83854,
                  'Field name': 'entity_country',
                  'Field content': '',
                },
                {
                  'Row#': 2338,
                  'Entity Id': 83852,
                  'Field name': 'entity_country',
                  'Field content': '',
                },
                {
                  'Row#': 2339,
                  'Entity Id': 83846,
                  'Field name': 'entity_country',
                  'Field content': '',
                },
              ]}
              onclickformType={(id) => {
                setRendercomponent('RecordswithError');
              }}
              editableFields={['Field content']}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
FileSummaryRecordswitherror.propTypes = {
  setRendercomponent: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handlessetfiletype: PropTypes.func.isRequired,
  filetype: PropTypes.string.isRequired,
  entityData: PropTypes.object.isRequired,
  radioGroup: PropTypes.array.isRequired,
};
export default FileSummaryRecordswitherror;
