/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jpt7iwbdxwfkjz")

  collection.listRule = "@request.auth.id != \"\""
  collection.viewRule = "@request.auth.id != \"\" && (@request.auth.account_type = \"host\" || @request.auth.account_type = \"guest\")"
  collection.createRule = "@request.auth.id != \"\" && @request.auth.account_type = \"guest\""
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.account_type = \"guest\""
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.account_type = \"guest\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jpt7iwbdxwfkjz")

  collection.listRule = ""
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
