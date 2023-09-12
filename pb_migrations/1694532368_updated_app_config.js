migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m2sva3whtqteho1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4kfzk0xb",
    "name": "flw_test_pk",
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
    "id": "hnmvwxti",
    "name": "flw_test_sk",
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
    "id": "v1exbx2f",
    "name": "flw_test_ek",
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
    "id": "hq4ak0vb",
    "name": "flw_live_pk",
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
    "id": "l7wk98cd",
    "name": "flw_live_sk",
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
    "id": "xo91eowe",
    "name": "flw_live_ek",
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
  collection.schema.removeField("4kfzk0xb")

  // remove
  collection.schema.removeField("hnmvwxti")

  // remove
  collection.schema.removeField("v1exbx2f")

  // remove
  collection.schema.removeField("hq4ak0vb")

  // remove
  collection.schema.removeField("l7wk98cd")

  // remove
  collection.schema.removeField("xo91eowe")

  return dao.saveCollection(collection)
})
