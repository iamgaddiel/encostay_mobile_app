migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jpt7iwbdxwfkjz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5qodvwka",
    "name": "comment",
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
  const collection = dao.findCollectionByNameOrId("2jpt7iwbdxwfkjz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5qodvwka",
    "name": "review",
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
