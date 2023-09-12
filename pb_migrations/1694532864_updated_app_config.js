migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m2sva3whtqteho1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q5z3vexm",
    "name": "strp_test_pk",
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
    "id": "nkjhltls",
    "name": "strp_test_sk",
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
    "id": "mmivu25t",
    "name": "strp_live_pk",
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
    "id": "sqbkkesk",
    "name": "strp_live_sk",
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
  collection.schema.removeField("q5z3vexm")

  // remove
  collection.schema.removeField("nkjhltls")

  // remove
  collection.schema.removeField("mmivu25t")

  // remove
  collection.schema.removeField("sqbkkesk")

  return dao.saveCollection(collection)
})
