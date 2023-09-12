migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lq9w3njwgw22iyp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fdyzomyf",
    "name": "refund_amount",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oqbtov5m",
    "name": "is_approved",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lq9w3njwgw22iyp")

  // remove
  collection.schema.removeField("fdyzomyf")

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
})
