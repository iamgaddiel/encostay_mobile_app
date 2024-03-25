/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  collection.listRule = "@request.auth.id != '' && (@request.auth.account_type = 'guest' || @request.auth.account_type = 'host')"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  collection.listRule = null

  return dao.saveCollection(collection)
})
