migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ho5ylw8m",
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
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  // remove
  collection.schema.removeField("ho5ylw8m")

  return dao.saveCollection(collection)
})
