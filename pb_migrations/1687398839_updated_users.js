migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_fhpQOzM` ON `users` (`phone`)",
    "CREATE UNIQUE INDEX `idx_UiIIhXS` ON `users` (`email`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_fhpQOzM` ON `users` (`phone`)"
  ]

  return dao.saveCollection(collection)
})
