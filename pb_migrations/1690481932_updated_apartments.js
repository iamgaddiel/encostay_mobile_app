migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4z2sknoc",
    "name": "images",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 99,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4z2sknoc",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 99,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
