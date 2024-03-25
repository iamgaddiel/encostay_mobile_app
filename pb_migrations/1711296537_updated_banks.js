/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj")

  // remove
  collection.schema.removeField("5cccnowj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gken8vq9",
    "name": "swift_code",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5cccnowj",
    "name": "social_security_number",
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

  // remove
  collection.schema.removeField("gken8vq9")

  return dao.saveCollection(collection)
})
