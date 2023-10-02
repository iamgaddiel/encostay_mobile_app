migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  collection.createRule = "@request.auth.id != ''"
  collection.updateRule = "@request.auth.id != ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
