migrate((db) => {
  const collection = new Collection({
    "id": "uidi9c7lqkqpfbj",
    "created": "2023-09-28 08:22:05.190Z",
    "updated": "2023-09-28 08:22:05.190Z",
    "name": "favourites",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hoc2xljh",
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
      },
      {
        "system": false,
        "id": "f5qgagyv",
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
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != ''",
    "viewRule": "@request.auth.id != '' && @request.auth.id = user.id",
    "createRule": "@request.auth.id != ''",
    "updateRule": "@request.auth.id != '' && @request.auth.id = user.id",
    "deleteRule": "@request.auth.id != '' && @request.auth.id = user.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uidi9c7lqkqpfbj");

  return dao.deleteCollection(collection);
})
