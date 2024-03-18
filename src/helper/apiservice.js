import apiCrud from './apicurd';
const apiurl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/';
const apiservice = {
  postentityData: async function (entitydata) {
    let response = await apiCrud.postData(apiurl + 'postentity', entitydata);
    return response;
  },
  getmemberfirm: async function () {
    console.log(apiurl);
    let response = await apiCrud.getData(apiurl + 'memberfirm');
    return response;
  },
  getprocessedby: async function (memberfirm) {
    let response = await apiCrud.getData(apiurl + 'processedby', {
      memberfirm: memberfirm,
    });
    return response;
  },
  getresultsummary: async function (filter) {
    console.log(filter);
    let response = await apiCrud.getData(apiurl + 'resultsummary', {
      filter: filter,
    });
    return response;
  },
  getrcvd: async function () {
    let response = await apiCrud.getData(apiurl + 'rcvd');
    return response;
  },
};
export default apiservice;
