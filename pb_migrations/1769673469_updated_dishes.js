/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1868475923")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1548162392",
    "max": null,
    "min": 0,
    "name": "totalCalories",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1717705915",
    "max": null,
    "min": 0,
    "name": "totalProtein",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number709770031",
    "max": null,
    "min": 0,
    "name": "totalFat",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number2959356825",
    "max": null,
    "min": 0,
    "name": "totalCarbs",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1868475923")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1548162392",
    "max": null,
    "min": null,
    "name": "totalCalories",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1717705915",
    "max": null,
    "min": null,
    "name": "totalProtein",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number709770031",
    "max": null,
    "min": null,
    "name": "totalFat",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number2959356825",
    "max": null,
    "min": null,
    "name": "totalCarbs",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
