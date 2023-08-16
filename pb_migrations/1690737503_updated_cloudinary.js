migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eaplmtz1rnnyc5c")

  collection.name = "imagekit"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eaplmtz1rnnyc5c")

  collection.name = "cloudinary"

  return dao.saveCollection(collection)
})
