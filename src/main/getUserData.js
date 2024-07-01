const axios = require('axios');
const config = require('../../config');

async function getUserData(event) {
  try {
    if (!global.user) {
      throw new Error("User data not loaded");
    }
    console.log('User data:', global.user);
    
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
    
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

module.exports = getUserData;