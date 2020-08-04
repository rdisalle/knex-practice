require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
  })

  function getItemsWithText(searchTerm) {
    knexInstance
    .select('id', 'name', 'price')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
        console.log(result)
    })
  }

  //getItemsWithText('Fish')

  //node ./src/drills.js

function paginateList(pageNumber) {
    const groceryPerPage = 6
    const offset = pageNumber * groceryPerPage - 1
    knexInstance
    .select('id', 'name', 'price')
    .from('shopping_list')
    .limit(groceryPerPage)
    .offset(offset)
    .then(result => {
        console.log(result)
    })
}

//paginateList(3)

function allItemsAddedAfter(days) {
    knexInstance
    .select('name', 'category', 'date_added')
    .from('shopping_list')
    .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days))
    .groupBy('name', 'category', 'date_added')
    .orderBy([
        { column: 'category', order: 'DESC' },
        { column: 'date_added', order: 'DESC' },
      ])
      .then(result => {
        console.log(result)
      })
  }

  //allItemsAddedAfter(2)

  function costPerCategory() {
    knexInstance
      .select('category')
      .sum('price as total')
      .from('shopping_list')
      .groupBy('category')
      .then(result => {
        console.log('COST PER CATEGORY')
        console.log(result)
      })
  }
  
  costPerCategory()