migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnb7hcg87lgnzis")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vrkvai6o",
    "name": "booking",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "lq9w3njwgw22iyp",
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
  collection.schema.removeField("vrkvai6o")

  return dao.saveCollection(collection)
})
