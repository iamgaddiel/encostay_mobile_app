migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnb7hcg87lgnzis")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gtybnauw",
    "name": "bank",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "e9wd7bqxswo9ogj",
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
  collection.schema.removeField("gtybnauw")

  return dao.saveCollection(collection)
})
