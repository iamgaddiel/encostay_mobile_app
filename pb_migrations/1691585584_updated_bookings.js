migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lq9w3njwgw22iyp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ckk81c9x",
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
  const collection = dao.findCollectionByNameOrId("lq9w3njwgw22iyp")

  // remove
  collection.schema.removeField("ckk81c9x")

  return dao.saveCollection(collection)
})
