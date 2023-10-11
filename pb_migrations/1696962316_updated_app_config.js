migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m2sva3whtqteho1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vibdyl0y",
    "name": "imgkit_pk",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mh4tfqsn",
    "name": "imgkit_sk",
    "type": "text",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("m2sva3whtqteho1")

  // remove
  collection.schema.removeField("vibdyl0y")

  // remove
  collection.schema.removeField("mh4tfqsn")

  return dao.saveCollection(collection)
})
