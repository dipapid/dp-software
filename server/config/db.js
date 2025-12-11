const mongoose = require('mongoose')
const Role = require('../models/role')

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => {
  console.log('Connected to database')
  init() // you can remove this row after first time executing
})

async function init() {  // ← Rendi async per usare await
  try {
    const count = await Role.estimatedDocumentCount();  // ← Usa await, no callback
    if (count === 0) {
      const roles = ['user', 'moderator', 'admin'];
      for (const name of roles) {
        const role = new Role({ name });
        await role.save();  // ← Usa await per save
        console.log(`added '${name}' to roles collection`);
      }
    }
  } catch (err) {
    console.log('error', err);
  }
}