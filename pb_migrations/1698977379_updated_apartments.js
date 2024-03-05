migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  // remove
  collection.schema.removeField("npehbcrj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h0eozd43",
    "name": "images",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 3,
      "values": [
        "image_1",
        "image_2",
        "image_3"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "npehbcrj",
    "name": "images",
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
  collection.schema.removeField("h0eozd43")

  return dao.saveCollection(collection)
})
