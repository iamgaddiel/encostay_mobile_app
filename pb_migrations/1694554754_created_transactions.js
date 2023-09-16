migrate((db) => {
  const collection = new Collection({
    "id": "hnb7hcg87lgnzis",
    "created": "2023-09-12 21:39:14.925Z",
    "updated": "2023-09-12 21:39:14.925Z",
    "name": "transactions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zsvj9vnh",
        "name": "apartment",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "593mp8jp2tcbrfe",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "yzy8wqbm",
        "name": "in",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ssuinjda",
        "name": "out",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "wrxsrsjp",
        "name": "amount",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != ''",
    "viewRule": "@request.auth.id != ''",
    "createRule": "@request.auth.id != ''",
    "updateRule": "@request.auth.id != ''",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hnb7hcg87lgnzis");

  return dao.deleteCollection(collection);
})
