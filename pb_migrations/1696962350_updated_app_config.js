migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m2sva3whtqteho1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d9oczkaq",
    "name": "imgkit_url",
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
  const collection = dao.findCollectionByNameOrId("m2sva3whtqteho1")

  // remove
  collection.schema.removeField("d9oczkaq")

  return dao.saveCollection(collection)
})
