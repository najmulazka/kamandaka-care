require('dotenv').config();
const axios = require('axios');
const moment = require('moment-timezone');
const { ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, ZOOM_ACCOUNT_ID } = process.env;

const getAccessToken = async () => {
  try {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'account_credentials',
        account_id: ZOOM_ACCOUNT_ID,
      },
      auth: {
        username: ZOOM_CLIENT_ID,
        password: ZOOM_CLIENT_SECRET,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response.data);
  }
};
  // const wibTime = '2025-02-04 12:05:00';

const createMeeting = async (time) => {
  const accessToken = await getAccessToken();
  // const wibTime = '2025-02-04 12:05:00';
  const wibTime = time; // fortmat wib
  const utcTime = moment.tz(wibTime, 'Asia/Jakarta').utc().format();

  try {
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: 'Konsultasi',
        type: 2,
        start_time: utcTime,
        duration: 60,
        timezone: 'Asia/Jakarta',
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          waiting_room: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // console.log({ linkClient: response.data.join_url, linkHost: response.data.start_url });
    return { linkClient: response.data.join_url, linkHost: response.data.start_url };
  } catch (error) {
    console.error('Error creating scheduled meeting:', error.response ? error.response.data : error.message);
  }
};

module.exports = createMeeting;
