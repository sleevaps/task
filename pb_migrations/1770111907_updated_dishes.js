/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1868475923")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number2566447538",
    "max": null,
    "min": 0,
    "name": "protein",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number2559934787",
    "max": null,
    "min": 0,
    "name": "fat",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number1385758587",
    "max": null,
    "min": 0,
    "name": "carbs",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1868475923")

  // remove field
  collection.fields.removeById("number2566447538")

  // remove field
  collection.fields.removeById("number2559934787")

  // remove field
  collection.fields.removeById("number1385758587")

  return app.save(collection)
})
