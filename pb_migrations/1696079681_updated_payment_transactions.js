migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  collection.name = "flutterwave_transactions"

  // remove
  collection.schema.removeField("3all2vy0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cmbdgvg1",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dtevvkam",
    "name": "account_type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "guest",
        "host"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n5qerz7i",
    "name": "transaction_type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "payment",
        "withdraw",
        "refund"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b1lppni7",
    "name": "ref_id",
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
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  collection.name = "payment_transactions"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3all2vy0",
    "name": "payment_method",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "flutterwave",
        "strip"
      ]
    }
  }))

  // remove
  collection.schema.removeField("cmbdgvg1")

  // remove
  collection.schema.removeField("dtevvkam")

  // remove
  collection.schema.removeField("n5qerz7i")

  // remove
  collection.schema.removeField("b1lppni7")

  return dao.saveCollection(collection)
})
