migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnb7hcg87lgnzis")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3iwxjxa5",
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
  const collection = dao.findCollectionByNameOrId("hnb7hcg87lgnzis")

  // remove
  collection.schema.removeField("3iwxjxa5")

  return dao.saveCollection(collection)
})
