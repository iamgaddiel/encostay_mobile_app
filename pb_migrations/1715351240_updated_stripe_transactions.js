/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cza8ps9q9vwgdg0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bym1m3tn",
    "name": "bookings",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "lq9w3njwgw22iyp",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cza8ps9q9vwgdg0")

  // remove
  collection.schema.removeField("bym1m3tn")

  return dao.saveCollection(collection)
})
