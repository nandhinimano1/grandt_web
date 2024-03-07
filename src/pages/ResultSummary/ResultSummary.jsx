import { Container } from '@mui/material';
import React, { useState } from 'react';
import MemberFirmSummary from '../../components/ResultSummary/MemberFirmSummary';
import MemberFirmLevelResults from '../../components/ResultSummary/MemberFirmLevelResults';
import FileSummaryByMsg from '../../components/ResultSummary/FileSummaryByMsg';
import FileSummaryRecordswitherror from '../../components/ResultSummary/FileSummaryRecordswitherror';
const radioGroup = [
  { value: 'All', label: 'All' },
  { value: 'Entity', label: 'Entity' },
  { value: 'Client Engagement', label: 'Client Engagement' },
  { value: 'Business Relationship', label: 'Business Relationship' },
  { value: 'Personnel Relationship', label: 'Personnel Relationship' },
];
function ResultSummary() {
  const [rendercomponent, setRendercomponent] = useState('');
  const [filetype, setFiletype] = useState('All');
  const [entityData, setEntityData] = useState({
    memberFirm: '',
    receivedFrom: '',
    datefrom: '',
    dateto: '',
  });
  const handlessetfiletype = data => {
    setFiletype(data);
  };
  const handleInputChange = event => {
    const { name, value } = event.target;
    setEntityData({ ...entityData, [name]: value });
  };
  const resetEntityData = () => {
    setEntityData({
      memberFirm: '',
      receivedFrom: '',
      datefrom: '',
      dateto: '',
    });
  };

  const renderComponent = () => {
    switch (rendercomponent) {
      case 'MemberFirmLevelResults':
        return (
          <MemberFirmLevelResults
            setRendercomponent={data => setRendercomponent(data)}
            handleInputChange={handleInputChange}
            filetype={filetype}
            handlessetfiletype={handlessetfiletype}
            entityData={entityData}
            radioGroup={radioGroup}
          />
        );
      case 'RecordswithError':
        return (
          <FileSummaryRecordswitherror
            setRendercomponent={data => setRendercomponent(data)}
            handleInputChange={handleInputChange}
            filetype={filetype}
            handlessetfiletype={handlessetfiletype}
            entityData={entityData}
            radioGroup={radioGroup}
          />
        );
      case 'FileSummaryByMsg':
        return (
          <FileSummaryByMsg
            setRendercomponent={data => setRendercomponent(data)}
            handleInputChange={handleInputChange}
            filetype={filetype}
            handlessetfiletype={handlessetfiletype}
            entityData={entityData}
            radioGroup={radioGroup}
          />
        );
      default:
        return (
          <MemberFirmSummary
            setRendercomponent={data => setRendercomponent(data)}
            handleInputChange={handleInputChange}
            filetype={filetype}
            resetEntityData={resetEntityData}
            handlessetfiletype={handlessetfiletype}
            entityData={entityData}
            radioGroup={radioGroup}
          />
        );
    }
  };
  return <Container comonent='main'>{renderComponent()}</Container>;
}

export default ResultSummary;
