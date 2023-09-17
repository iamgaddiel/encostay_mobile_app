migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj")

  collection.name = "banks"
  collection.listRule = "@request.auth.id != '' && @request.auth.account_type = 'host'"
  collection.viewRule = "@request.auth.id != '' && @request.auth.account_type = 'host'"
  collection.createRule = "@request.auth.id != '' && @request.auth.account_type = 'host'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj")

  collection.name = "bank_accounts"
  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
