// responseState.js
let apiResponse = null;

export const setApiResponse = (response) => {
    apiResponse = response;
    console.log('apiResponse', apiResponse);
};

export const getApiResponse = () => {
    return apiResponse;
};
