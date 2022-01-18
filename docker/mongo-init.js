db = db.getSiblingDB('TestDB');

db.createUser({
  user: 'TestUser',
  pwd: 'TestPassword',
  roles: [
    {
      role: 'dbOwner',
      db: 'TestDB'
    }
  ]
});
