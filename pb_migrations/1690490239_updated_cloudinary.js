migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eaplmtz1rnnyc5c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "09jnocrp",
    "name": "recordId",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eaplmtz1rnnyc5c")

  // remove
  collection.schema.removeField("09jnocrp")

  return dao.saveCollection(collection)
})
