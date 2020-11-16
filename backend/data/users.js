const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: 'admin@gamu.lk',
        password: bcrypt.hashSync('12345',10),
        isAdmin: true,
    },
    {
        name: 'john doe',
        email: 'john@gamu.lk',
        password: bcrypt.hashSync('12345',10),
        isAdmin: true,
    },
    {
        name: 'jeane doe',
        email: 'jeane@gamu.lk',
        password: bcrypt.hashSync('12345',10),
        isAdmin: true,
    },
]

module.exports = users