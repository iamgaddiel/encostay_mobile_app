migrate((db) => {
  const collection = new Collection({
    "id": "m2sva3whtqteho1",
    "created": "2023-08-09 12:20:26.576Z",
    "updated": "2023-08-09 12:20:26.576Z",
    "name": "app_config",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lmiuqvol",
        "name": "app_name",
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
        "id": "20cl2tlm",
        "name": "service_charge",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "prtayvlw",
        "name": "website",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
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
  const collection = dao.findCollectionByNameOrId("m2sva3whtqteho1");

  return dao.deleteCollection(collection);
})
