import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import apiservice from '../../../helper/apiservice';
import '../ResultSummary.css';
import PreviewTable from '../../PreviewTable';
import Filter from '../Filter';

const MemoizedPreviewTable = memo(PreviewTable);

function MemberFirmSummary(props) {
  const {
    setRendercomponent,
    handleInputChange,
    handlessetfiletype,
    filetype,
    entityData,
    radioGroup,
    resetEntityData,
  } = props;

  const [rcvd, setRcvd] = useState([]);
  const [filescount, setFilescount] = useState([]);
  const [formtypecount, setFormtypecount] = useState([]);

  const getrcvd = async () => {
    try {
      await apiservice
        .getrcvd()
        .then((response) => {
          setRcvd(response.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getrcvd();
  }, []);

  useEffect(() => {
    const getresultSummary = async () => {
      try {
        await apiservice
          .getresultsummary(filetype)
          .then((response) => {
            setFormtypecount(response.data);
            const aggregatedData = response.data.reduce(
              (acc, curr) => {
                acc['Total files'] += curr['Total files'];
                acc['Passed'] += curr['Passed'];
                acc['Failed'] += curr['Failed'];
                return acc;
              },
              { 'Total files': 0, Passed: 0, Failed: 0 }
            );
            setFilescount([aggregatedData]);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    getresultSummary();
  }, [filetype]);

  return (
    <Container comonent='main'>
      <Grid container spacing={5} marginBottom={8}>
        <Grid item xs={12}>
          <h1 className='alignCenter'>
            Data Profile - Member firm result summary
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
        <Grid item xs={12} className='alignCenter'>
          <Button variant='outlined' onClick={() => resetEntityData()}>
            Clear Selection
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ m: 1 }} />
        </Grid>
        <Grid item xs={12}>
          <MemoizedPreviewTable tableData={rcvd} />
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
          <Grid item xs={6}>
            <MemoizedPreviewTable tableData={filescount} />
          </Grid>
          <Grid item xs={12}>
            <MemoizedPreviewTable
              tableData={formtypecount}
              ignoretitle
              expand
              addnavigationall
              onclickformType={(filetype) => {
                setRendercomponent('MemberFirmLevelResults');
                handlessetfiletype(filetype);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
MemberFirmSummary.propTypes = {
  setRendercomponent: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handlessetfiletype: PropTypes.func.isRequired,
  resetEntityData: PropTypes.func.isRequired,
  filetype: PropTypes.string.isRequired,
  entityData: PropTypes.object.isRequired,
  radioGroup: PropTypes.array.isRequired,
};
export default MemberFirmSummary;
