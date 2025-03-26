const { google } = require('googleapis');
const moment = require('moment-timezone');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, GOOGLE_REFRESH_TOKEN } = process.env;

const getAccessToken = async () => {
  const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL);

  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const { credentials } = await oauth2Client.refreshAccessToken();
  return credentials.access_token;
};

const gmeet = async (gmail, serviceName, startTime) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: await getAccessToken() });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const event = {
    summary: serviceName,
    location: 'Google Meet',
    start: {
      // dateTime: '2025-03-13T10:00:00-07:00',
      dateTime: startTime,
      timeZone: 'Asia/Jakarta',
    },
    end: {
      dateTime: moment(startTime).add(1, 'hour').format(),
      timeZone: 'Asia/Jakarta',
    },
    attendees: gmail,
    conferenceData: {
      createRequest: {
        requestId: '1',
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    visibility: 'public',
    guestsCanModify: true,
    guestsCanSeeOtherGuests: true,
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });
    return response;
    // res.status(200).json({ message: 'Event created', eventLink: response.data.htmlLink });
  } catch (error) {
    return error;
  }
};

module.exports = gmeet;
