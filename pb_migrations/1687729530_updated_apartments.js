migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  collection.createRule = "id = @request.auth.id && host.account_type = 'host'"
  collection.updateRule = "id = @request.auth.id && host.account_type = 'host' && host.id = @request.auth.id"
  collection.deleteRule = "id = @request.auth.id && host.account_type = 'host' && host.id = @request.auth.id"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v64zp967",
    "name": "host",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // remove
  collection.schema.removeField("v64zp967")

  return dao.saveCollection(collection)
})
