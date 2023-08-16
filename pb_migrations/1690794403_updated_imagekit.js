migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eaplmtz1rnnyc5c")

  // remove
  collection.schema.removeField("ognyyb0e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b0uqqjic",
    "name": "pb_key",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2owwmqhh",
    "name": "pv_key",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ognyyb0e",
    "name": "cloudname",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b0uqqjic",
    "name": "api_key",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2owwmqhh",
    "name": "api_secret",
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
})
