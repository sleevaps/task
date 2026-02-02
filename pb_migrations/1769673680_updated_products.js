/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number627390209",
    "max": null,
    "min": 0,
    "name": "calories",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(3, new Field({
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

  // update field
  collection.fields.addAt(4, new Field({
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

  // update field
  collection.fields.addAt(5, new Field({
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
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number627390209",
    "max": null,
    "min": null,
    "name": "calories",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2566447538",
    "max": null,
    "min": null,
    "name": "protein",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number2559934787",
    "max": null,
    "min": null,
    "name": "fat",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number1385758587",
    "max": null,
    "min": null,
    "name": "carbs",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
