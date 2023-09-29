migrate((db) => {
  const collection = new Collection({
    "id": "h9trrtokku9osol",
    "created": "2023-09-19 17:07:04.005Z",
    "updated": "2023-09-19 17:07:04.005Z",
    "name": "payment_transactions",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("h9trrtokku9osol");

  return dao.deleteCollection(collection);
})
