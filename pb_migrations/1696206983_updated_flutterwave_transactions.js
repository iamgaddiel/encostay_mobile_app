migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  // remove
  collection.schema.removeField("xq0enfl9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "06a07had",
    "name": "transaction_id",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
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

  // remove
  collection.schema.removeField("06a07had")

  return dao.saveCollection(collection)
})
