/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnb7hcg87lgnzis")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ohwjrjdk",
    "name": "reference",
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
  const collection = dao.findCollectionByNameOrId("hnb7hcg87lgnzis")

  // remove
  collection.schema.removeField("ohwjrjdk")

  return dao.saveCollection(collection)
})
