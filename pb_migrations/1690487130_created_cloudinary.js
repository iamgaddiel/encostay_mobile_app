migrate((db) => {
  const collection = new Collection({
    "id": "eaplmtz1rnnyc5c",
    "created": "2023-07-27 19:45:30.981Z",
    "updated": "2023-07-27 19:45:30.981Z",
    "name": "cloudinary",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "b0uqqjic",
        "name": "api_key",
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
        "id": "2owwmqhh",
        "name": "api_secret",
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
        "id": "ognyyb0e",
        "name": "cloudname",
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
  const collection = dao.findCollectionByNameOrId("eaplmtz1rnnyc5c");

  return dao.deleteCollection(collection);
})
