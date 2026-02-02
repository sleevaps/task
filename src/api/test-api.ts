import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090')

async function testPocketBase() {
  try {
    console.log('--- Получаем все продукты ---')
    const products = await pb.collection('products').getFullList()
    console.log('Продукты:', products)

    console.log('--- Создаём тестовый продукт ---')
    const testProduct = await pb.collection('products').create({
      name: 'Тестовый продукт',
      calories: 100,
      protein: 5,
      fat: 2,
      carbs: 20
    })
    console.log('Создан продукт:', testProduct)

    console.log('--- Создаём тестовое блюдо ---')
    const testDish = await pb.collection('dishes').create({
      name: 'Тестовое блюдо',
      ingredients: [
        {
          productId: testProduct.id,
          quantity: 200 // грамм
        }
      ]
    })
    console.log('Создано блюдо:', testDish)

    console.log('--- Получаем блюдо с ингредиентами ---')
    const fetchedDish = await pb.collection('dishes').getOne(testDish.id)
    console.log('Блюдо:', fetchedDish)

    console.log('--- Удаляем тестовые записи ---')
    await pb.collection('dishes').delete(testDish.id)
    await pb.collection('products').delete(testProduct.id)
    console.log('Тестовые записи удалены')

  } catch (err: any) {
    console.error('Ошибка API:', err.response?.data || err)
  }
}

testPocketBase()
