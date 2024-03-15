import React, { useState } from 'react';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Container,
  Grid,
} from '@mui/material';
import './OnBoarding.css';
import EntityForm from '../../components/EntityForm';
import ClientEngagementForm from '../../components/Onboard/ClientEngagementForm';
import BusinessRelationshipForm from '../../components/Onboard/BusinessRelationshipForm';
import PersonnelRelationshipForm from '../../components/Onboard/PersonnelRelationshipForm';

function OnBoarding() {
  const [formType, setFormType] = useState('entity');
  const handleRadioChange = (e) => {
    setFormType(e.target.value);
  };
  const radioGroup = [
    { value: 'entity', label: 'Entity' },
    { value: 'client-engagement', label: 'Client Engagement' },
    { value: 'business-relationship', label: 'Business Relationship' },
    { value: 'personnel-relationship', label: 'Personnel Relationship' },
  ];
  return (
    <Container comonent='main'>
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <h1 className='alignCenter'>Onboard A New File</h1>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: '#EBEBE4',
            padding: 2,
          }}
        >
          <FormControl component='fieldset' fullWidth>
            <FormLabel component='legend'>
              Select File Type to be Uploaded
            </FormLabel>
            <RadioGroup
              row
              aria-label='fileType'
              name='fileType'
              value={formType}
              onChange={handleRadioChange}
            >
              {radioGroup.map(({ label, value }) => (
                <FormControlLabel
                  key={`index${label}`}
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        {formType === 'entity' && <EntityForm />}
        {formType === 'client-engagement' && <ClientEngagementForm />}
        {formType === 'business-relationship' && <BusinessRelationshipForm />}
        {formType === 'personnel-relationship' && <PersonnelRelationshipForm />}
      </Grid>
    </Container>
  );
}

export default OnBoarding;
