migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e4fckugs",
    "name": "max_number_of_pets_allowed",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cqornfpw",
    "name": "max_number_of_children_allowed",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("593mp8jp2tcbrfe")

  // remove
  collection.schema.removeField("e4fckugs")

  // remove
  collection.schema.removeField("cqornfpw")

  return dao.saveCollection(collection)
})
