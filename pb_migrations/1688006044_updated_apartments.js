migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qb503hdz",
    "name": "description",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qb503hdz",
    "name": "about",
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
