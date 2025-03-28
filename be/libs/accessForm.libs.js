const { google } = require('googleapis');
const drive = google.drive('v3');
const { FILE_ID_GAYA_BELAJAR, FILE_ID_KEPRIBADIAN, FILE_ID_MINAT, FILE_ID_GANGGUAN_PSIKOLOGI, FILE_ID_REKRUITMEN_PEKERJAAN, FILE_ID_IST, FILE_ID_CFIT_2, FILE_ID_CFIT_3 } = process.env;

const auth = new google.auth.GoogleAuth({
  // keyFile: 'credentials.json',
  keyFile: 'credentialskamcare.json',
  scopes: 'https://www.googleapis.com/auth/drive',
});

module.exports = {
  setAccessForm: async (testName, email) => {
    let fileId;
    if (testName.toLowerCase().includes('belajar')) {
      fileId = FILE_ID_GAYA_BELAJAR;
    } else if (testName.toLowerCase().includes('kepribadian')) {
      fileId = FILE_ID_KEPRIBADIAN;
    } else if (testName.toLowerCase().includes('minat')) {
      fileId = FILE_ID_MINAT;
    } else if (testName.toLowerCase().includes('psikologi')) {
      fileId = FILE_ID_GANGGUAN_PSIKOLOGI;
    } else if (testName.toLowerCase().includes('pekerjaan')) {
      fileId = FILE_ID_REKRUITMEN_PEKERJAAN;
    } else if (testName.toLowerCase().includes('ist')) {
      fileId = FILE_ID_IST;
    } else if (testName.toLowerCase().includes('cfit 2')) {
      fileId = FILE_ID_CFIT_2;
    } else if (testName.toLowerCase().includes('cfit 3')) {
      fileId = FILE_ID_CFIT_3;
    }

    await drive.permissions.create({
      auth,
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'user',
        emailAddress: email,
      },
      fields: 'id',
      sendNotificationEmail: false,
    });

    console.log(`Akses diberikan ke: ${email}`);
  },

  removeAccessForm: async () => {
    let listFileId = [FILE_ID_GAYA_BELAJAR, FILE_ID_KEPRIBADIAN, FILE_ID_MINAT, FILE_ID_GANGGUAN_PSIKOLOGI, FILE_ID_REKRUITMEN_PEKERJAAN, FILE_ID_IST, FILE_ID_CFIT_2, FILE_ID_CFIT_3];

    await Promise.all(
      listFileId.map(async (fileId) => {
        const listAccess = await drive.permissions.list({
          auth,
          fileId: fileId,
          fields: 'permissions(id, emailAddress, role)',
        });

        const listAccessReaders = listAccess.data.permissions.filter((p) => p.role === 'reader');
        await Promise.all(
          listAccessReaders.map(async (listAccessReader) => {
            return drive.permissions.delete({
              auth,
              fileId: fileId,
              permissionId: listAccessReader.id,
            });
          })
        );
      })
    );
  },
};
