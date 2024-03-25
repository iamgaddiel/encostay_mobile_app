/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  collection.viewRule = "@request.auth.id != '' && (@request.auth.account_type = 'guest' || @request.auth.account_type = 'host')"
  collection.updateRule = "@request.auth.id != '' && @request.auth.account_type = 'guest'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  collection.viewRule = null
  collection.updateRule = "@request.auth.id != ''"

  return dao.saveCollection(collection)
})
