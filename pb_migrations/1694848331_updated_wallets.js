migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tkw85c8lscjgek6")

  collection.listRule = "@request.auth.id != '' && @request.auth.account_type = 'host'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tkw85c8lscjgek6")

  collection.listRule = null

  return dao.saveCollection(collection)
})
