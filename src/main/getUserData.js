const axios = require('axios');
const config = require('../../config');

async function getUserData(event) {
  try {
    console.log('Fetching user data for userId:', user);
    const response = await axios.get(`${config.api.url}/user/${user.user._id}`);
    console.log('User data received:', response.data);
    user = response.data;

    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      downloadHistory: user.download_history
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

module.exports = getUserData;