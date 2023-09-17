migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tkw85c8lscjgek6")

  collection.viewRule = "@request.auth.id != '' && @request.auth.account_type = 'host'"
  collection.createRule = ""
  collection.updateRule = "@request.auth.id != '' && @request.auth.account_type = 'host'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tkw85c8lscjgek6")

  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
