/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "cza8ps9q9vwgdg0",
    "created": "2024-05-10 14:19:29.167Z",
    "updated": "2024-05-10 14:19:29.167Z",
    "name": "stripe_transactions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qgmquttf",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "uwsbsudy",
        "name": "account_type",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "guest",
            "host"
          ]
        }
      },
      {
        "system": false,
        "id": "hr7ho7zm",
        "name": "transaction_type",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "payment",
            "withdraw",
            "refund"
          ]
        }
      },
      {
        "system": false,
        "id": "mlu8w0rd",
        "name": "transaction_id",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cza8ps9q9vwgdg0");

  return dao.deleteCollection(collection);
})
