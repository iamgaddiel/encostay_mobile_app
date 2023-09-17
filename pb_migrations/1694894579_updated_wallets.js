migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tkw85c8lscjgek6")

  collection.updateRule = "@request.auth.id != ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tkw85c8lscjgek6")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
