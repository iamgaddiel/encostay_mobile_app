migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xq0enfl9",
    "name": "transaction_id",
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
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  // remove
  collection.schema.removeField("xq0enfl9")

  return dao.saveCollection(collection)
})
