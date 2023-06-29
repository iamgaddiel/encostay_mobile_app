migrate((db) => {
  const collection = new Collection({
    "id": "2jpt7iwbdxwfkjz",
    "created": "2023-06-25 21:48:02.545Z",
    "updated": "2023-06-25 21:48:02.545Z",
    "name": "reviews",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vjsbegds",
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
        "id": "fpdsoogd",
        "name": "stars",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": null
        }
      },
      {
        "system": false,
        "id": "5qodvwka",
        "name": "review",
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
        "id": "u0plpbe5",
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
    "indexes": [
      "CREATE UNIQUE INDEX `idx_Vk8psqK` ON `reviews` (`user`)"
    ],
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
  const collection = dao.findCollectionByNameOrId("2jpt7iwbdxwfkjz");

  return dao.deleteCollection(collection);
})
