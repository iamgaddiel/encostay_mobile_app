migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  // remove
  collection.schema.removeField("h0eozd43")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vv9qlzbn",
    "name": "image_1",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4opuz609",
    "name": "image_2",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dvlghpeu",
    "name": "image_3",
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
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

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

  // remove
  collection.schema.removeField("vv9qlzbn")

  // remove
  collection.schema.removeField("4opuz609")

  // remove
  collection.schema.removeField("dvlghpeu")

  return dao.saveCollection(collection)
})
