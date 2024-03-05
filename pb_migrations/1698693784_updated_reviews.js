migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jpt7iwbdxwfkjz")

  // remove
  collection.schema.removeField("foit7l4a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3z3upkus",
    "name": "apartment",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "593mp8jp2tcbrfe",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jpt7iwbdxwfkjz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "foit7l4a",
    "name": "booking",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "lq9w3njwgw22iyp",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("3z3upkus")

  return dao.saveCollection(collection)
})
