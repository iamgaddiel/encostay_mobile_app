migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  collection.deleteRule = "@request.auth.id != \"\" && host.account_type = 'host' && host.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
