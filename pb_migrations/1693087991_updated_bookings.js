migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lq9w3njwgw22iyp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sp5tjulb",
    "name": "duration_of_stay",
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
  const collection = dao.findCollectionByNameOrId("lq9w3njwgw22iyp")

  // remove
  collection.schema.removeField("sp5tjulb")

  return dao.saveCollection(collection)
})
