migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lq9w3njwgw22iyp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oqbtov5m",
    "name": "is_is_approved",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lq9w3njwgw22iyp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oqbtov5m",
    "name": "is_aproved",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
