import React, { useEffect, useState, memo } from 'react';
import { TextField, Button, FormControl, Container, Typography, InputLabel, MenuItem, Grid } from '@mui/material';
import Papa from 'papaparse';
import PreviewTable from './PreviewTable';
import apiservice from '../../helper/apiservice';

const MemoizedPreviewTable = memo(PreviewTable);

const BusinessRelationshipForm = () => {
  const [entityData, setEntityData] = useState({
    memberFirm: '',
    receivedFrom: '',
    processedBy: '',
    receivedDate: new Date().toISOString().split('T')[0],
    fileName: '',
  });
  const [data, setData] = useState([]);
  const [memberFirms, setMemberFirms] = useState([]);
  const [processedBy, setProcessedBy] = useState([]);
  const [fileError, setFileError] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const getMemberFirm = async () => {
    try {
      await apiservice
        .getmemberfirm()
        .then(response => setMemberFirms(response.data))
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const getProcessedBy = async memberFirm => {
    try {
      await apiservice
        .getprocessedby(memberFirm)
        .then(response => setProcessedBy(response.data))
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);

      alert(error);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEntityData({ ...entityData, [name]: value });
    if (name === 'memberFirm') getProcessedBy(value);
  };

  const readFileData = file => {
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      setData(csv?.data);
    };
    reader.readAsText(file);
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop();
      if (['xlsx', 'xls', 'csv'].includes(fileType)) {
        readFileData(file);
        setEntityData({ ...entityData, fileName: file.name });
        setFileError(false);
        setShowPreview(true);
      } else {
        setEntityData({ ...entityData, fileName: '' });
        setFileError(true);
      }
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!fileError && entityData.fileName) {
      try {
        await apiservice.postentityData({
          ...entityData,
          fileData: JSON.stringify(data),
        });
        alert('Data submitted successfully');
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      setFileError(true);
    }
  };

  useEffect(() => {
    getMemberFirm();
  }, []);
  return (
    <Container component='main' sx={{ marginTop: '10%', marginBottom: '10%' }}>
      <Grid container>
        <FormControl component='form' onSubmit={e => handleSubmit(e)} fullWidth autoComplete='off'>
          <FormControl fullWidth sx={{ marginBottom: '1%' }}>
            <InputLabel shrink>Member Firm</InputLabel>
            <TextField
              select
              fullWidth
              id='memberFirm'
              name='memberFirm'
              value={entityData.memberFirm}
              onChange={handleInputChange}
              margin='normal'
              variant='outlined'
              required
            >
              {memberFirms.map((firm, index) => (
                <MenuItem key={firm} value={firm}>
                  {firm}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '1%' }}>
            <InputLabel shrink>Received From</InputLabel>
            <TextField
              margin='normal'
              fullWidth
              id='receivedFrom'
              name='receivedFrom'
              value={entityData.receivedFrom}
              onChange={handleInputChange}
              variant='outlined'
              type='email'
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '1%' }}>
            <InputLabel shrink>Processed By</InputLabel>
            <TextField
              margin='normal'
              select
              fullWidth
              id='processedBy'
              name='processedBy'
              value={entityData.processedBy}
              onChange={handleInputChange}
              variant='outlined'
              required
            >
              {processedBy.map((user, index) => (
                <MenuItem key={`index-${user}`} value={user}>
                  {user}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '1%' }}>
            <InputLabel shrink>Received Date</InputLabel>
            <TextField
              margin='normal'
              fullWidth
              id='receivedDate'
              name='receivedDate'
              value={entityData.receivedDate}
              onChange={handleInputChange}
              variant='outlined'
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </FormControl>
          <Grid
            item
            xs={12}
            container
            sx={{
              alignItems: 'baseline',
              border: 1,
              borderColor: '#EBEBE4',
              borderRadius: 1,
              padding: 2,
              overflow: 'auto',
            }}
          >
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              sx={{
                marginBottom: 3,
              }}
            >
              <Button variant='contained' component='label' color='primary'>
                Choose File <input type='file' hidden onChange={handleFileChange} />
              </Button>
            </Grid>

            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
              <Typography variant='body1' sx={{ flexGrow: 2, textAlign: 'left' }}>
                {entityData.fileName || 'No file chosen'}
              </Typography>
            </Grid>

            <Grid item container spacing={2} xs={12} sm={6} md={4} lg={4} xl={4}>
              <Grid item xs={12}>
                <Button
                  variant='outlined'
                  color='primary'
                  sx={{
                    flexGrow: 1,
                    mb: 1,
                    width: '100%',
                  }}
                  onClick={() => {
                    setShowPreview(!showPreview);
                  }}
                >
                  {!showPreview ? 'Show Preview' : 'Hide Preview'}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{
                    flexGrow: 1,
                    mb: 1,
                    width: '100%',
                  }}
                  type='submit'
                >
                  Accept File
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </Grid>

      {fileError && (
        <Grid item xs={12}>
          <Typography color='error' sx={{ mt: 2 }}>
            Please select a valid Excel file (.xls, .xlsx)
          </Typography>
        </Grid>
      )}
      <div style={{ mb: 4 }}>
        {showPreview && entityData.fileName && <MemoizedPreviewTable tableData={data} showrowscount showhash />}
      </div>
    </Container>
  );
};

export default BusinessRelationshipForm;
