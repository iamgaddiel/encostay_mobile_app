migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnb7hcg87lgnzis")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yzy8wqbm",
    "name": "is_in",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ssuinjda",
    "name": "is_out",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnb7hcg87lgnzis")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yzy8wqbm",
    "name": "in",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ssuinjda",
    "name": "out",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
