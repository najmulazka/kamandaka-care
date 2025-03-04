const prisma = require('../libs/prisma.lib');
const bcrypt = require('bcrypt');
const { USERNAME_ADMIN, PASSWORD_ADMIN, CLIENT_EMAIL, CLIENT_FULLNAME, CLIENT_GOOGLE_ID } = process.env;

module.exports = {
  firstRun: async () => {
    const adminExist = await prisma.admin.findUnique({ where: { username: USERNAME_ADMIN } });
    if (!adminExist) {
      const encryptedPassword = await bcrypt.hash(PASSWORD_ADMIN, 10);
      await prisma.admin.create({
        data: {
          username: USERNAME_ADMIN,
          password: encryptedPassword,
        },
      });
    }

    const clientExist = await prisma.clients.findUnique({ where: { email: CLIENT_EMAIL } });
    if (!clientExist) {
      await prisma.clients.create({
        data: {
          fullName: CLIENT_FULLNAME,
          email: CLIENT_EMAIL,
          googleId: CLIENT_GOOGLE_ID,
        },
      });
    }
  },
};
