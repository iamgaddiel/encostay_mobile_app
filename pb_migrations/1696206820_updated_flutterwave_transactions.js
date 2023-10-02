migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cmbdgvg1",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dtevvkam",
    "name": "account_type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "guest",
        "host"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n5qerz7i",
    "name": "transaction_type",
    "type": "select",
    "required": true,
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol")

  // update
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

  // update
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

  // update
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

  return dao.saveCollection(collection)
})
