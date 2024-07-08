const axios = require('axios');
const config = require('../../config');

async function getUserData(event) {
  try {
    if (!global.user) {
      throw new Error("User data not loaded");
    }
    console.log('User data:', global.user);
    // console.log('Fetching user data for userId:', user);
    // const response = await axios.get(`${config.api.url}/user/${user.user._id}`);
    // console.log('User data received:', response.data);
    // user = response.data;
    const user_id = global.user.user._id;
    const response = await axios.get(`${config.api.url}/user/${user_id}`);
    const userData = response.data;
    console.log('User data received from API :', userData);

    return {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      downloadHistory: userData.download_history
    };
    // return {
    //   firstname: userData.firstname,
    //   lastname: userData.lastname,
    //   email: userData.email,
    //   downloadHistory: userData.download_history.map(download => ({
    //     download_date: download.download_date,
    //     status: download.status,
    //     security_tool_id: {
    //       name: download.security_tool_id.name,
    //       description: download.security_tool_id.description,
    //       version: download.security_tool_id.version,
    //     }
    //   }))
    // };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

module.exports = getUserData;