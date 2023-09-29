migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5cccnowj",
    "name": "social_security_number",
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
    "id": "daqzd0ad",
    "name": "address",
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
    "id": "5zh4bkxk",
    "name": "routing_number",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj")

  // remove
  collection.schema.removeField("5cccnowj")

  // remove
  collection.schema.removeField("daqzd0ad")

  // remove
  collection.schema.removeField("5zh4bkxk")

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
})
