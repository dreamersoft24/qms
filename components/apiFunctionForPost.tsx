import axios, { AxiosError } from 'axios';

async function fetchApiDataPost(
  url: string,
  method: string,
  data?: any, // Add data parameter to accept request body data
  setDataCallback?: Function,
  setErrorMsg?: Function
): Promise<void> {
  try {
    console.log(`Fetching data from ${url}...`);
    const response = await axios({
      method,
      url,
      data, // Include data in the request configuration
    });
    const responseData = response.data;

    if (setDataCallback) {
      setDataCallback(responseData);
      console.log(`Data fetched successfully from ${url}:`, responseData);
    }

    // Clear any previous error message if there is no error
    if (setErrorMsg) {
      setErrorMsg('');
    }

  } catch (error) {
    // Check if the error is an instance of AxiosError
    if (axios.isAxiosError(error)) {
      // If the error contains a response, pass the message to setErrorMsg
      if (error.response && setErrorMsg) {
        setErrorMsg(error.response.data.message);
      } else if (setErrorMsg) {
        setErrorMsg('An unknown error occurred');
      }
    } else {
      // Handle other types of errors
      if (setErrorMsg) {
        setErrorMsg('An unknown error occurred');
      }
    }
  }
}

export default fetchApiDataPost;
