migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r49pjgcb",
    "name": "account_name",
    "type": "text",
    "required": true,
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r49pjgcb",
    "name": "holder_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
