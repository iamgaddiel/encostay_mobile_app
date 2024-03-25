/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xtao85dc",
    "name": "bank_id",
    "type": "text",
    "required": false,
    "presentable": false,
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
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj")

  // remove
  collection.schema.removeField("xtao85dc")

  return dao.saveCollection(collection)
})
