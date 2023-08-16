migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eaplmtz1rnnyc5c")

  collection.viewRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eaplmtz1rnnyc5c")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
