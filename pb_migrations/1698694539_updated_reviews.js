migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jpt7iwbdxwfkjz")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2jpt7iwbdxwfkjz")

  collection.listRule = null

  return dao.saveCollection(collection)
})
