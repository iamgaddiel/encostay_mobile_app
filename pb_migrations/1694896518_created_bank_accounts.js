migrate((db) => {
  const collection = new Collection({
    "id": "e9wd7bqxswo9ogj",
    "created": "2023-09-16 20:35:18.950Z",
    "updated": "2023-09-16 20:35:18.950Z",
    "name": "bank_accounts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nzpyfaiv",
        "name": "host",
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
      },
      {
        "system": false,
        "id": "vrehme3f",
        "name": "bank_name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "5lkzejic",
        "name": "account_number",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "r49pjgcb",
        "name": "account_name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "vddcbwwf",
        "name": "bvn",
        "type": "text",
        "required": false,
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
  const collection = dao.findCollectionByNameOrId("e9wd7bqxswo9ogj");

  return dao.deleteCollection(collection);
})
