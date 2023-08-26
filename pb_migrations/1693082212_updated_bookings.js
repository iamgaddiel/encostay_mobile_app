migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lq9w3njwgw22iyp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t6wxbn4r",
    "name": "transaction_paid",
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
  collection.schema.removeField("t6wxbn4r")

  return dao.saveCollection(collection)
})
