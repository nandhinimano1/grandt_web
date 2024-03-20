import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Button, Typography } from '@mui/material';
import apiservice from '../../../helper/apiservice';
import '../ResultSummary.css';
import PreviewTable from '../../PreviewTable';
import Filter from '../Filter';

const MemoizedPreviewTable = memo(PreviewTable);

function MemberFirmLevelResults(props) {
  const {
    setRendercomponent,
    handleInputChange,
    handlessetfiletype,
    filetype,
    entityData,
    radioGroup,
  } = props;
  const [filetypedetailsView, setFiletypedetailsView] = useState([]);

  const getresultSummary = useCallback(async () => {
    try {
      await apiservice.getresultsummary(filetype).then((response) => {
        let responseData = response.data;
        setFiletypedetailsView(
          responseData.find((i) => i.type === filetype)?.details
        );
      });
    } catch (error) {
      //  console.error(error);
    }
  }, [filetype]);

  useEffect(() => {
    getresultSummary();
  }, [filetype, getresultSummary]);

  return (
    <Container comonent='main'>
      <Grid container spacing={5} marginBottom={8}>
        <Grid item xs={12}>
          <h1 className='alignCenter'>
            Data Profile - Member firm file level results
          </h1>
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
          <Button variant='outlined' onClick={() => setRendercomponent('')}>
            Back to MF Search
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Selection result summary: (Click{' '}
            <span style={{ textDecoration: 'underline' }}>Underline</span>{' '}
            button to expand:)
          </Typography>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6}></Grid>
          <Grid item xs={12}>
            <MemoizedPreviewTable
              tableData={filetypedetailsView || []}
              navigation
              onclickformType={() => setRendercomponent('FileSummaryByMsg')}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
MemberFirmLevelResults.propTypes = {
  setRendercomponent: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handlessetfiletype: PropTypes.func.isRequired,
  filetype: PropTypes.any.isRequired,
  entityData: PropTypes.object.isRequired,
  radioGroup: PropTypes.array.isRequired,
};
export default MemberFirmLevelResults;
