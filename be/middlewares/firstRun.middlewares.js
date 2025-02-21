const prisma = require('../libs/prisma.lib');
const bcrypt = require('bcrypt');
const { USERNAME_ADMIN, PASSWORD_ADMIN } = process.env;

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
  },
};
