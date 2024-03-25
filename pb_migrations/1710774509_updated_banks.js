/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj")

  collection.createRule = "@request.auth.id != '' && @request.auth.account_type = 'host' || @request.auth.account_type = 'guest'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj")

  collection.createRule = "@request.auth.id != '' && @request.auth.account_type = 'host'"

  return dao.saveCollection(collection)
})
