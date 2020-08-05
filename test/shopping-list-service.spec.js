const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping Items service object`, function() {
    let db
    let testItems = [
        {
            id: 1,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            name: 'First test item!',
            category: 'Lunch',
            price: '20.10',
            checked: false
        },
        {   
            id: 2,
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            name: 'Second test item!',
            category: 'Main',
            price: '35.16',
            checked: false
        },
        {   
            id: 3,
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            name: 'Third test item!',
            category: 'Snack',
            price: '1.50',
            checked: true
        },
        {
        id: 4,
        date_added: new Date('1919-12-22T16:28:32.615Z'),
        name: 'Fourth test item!',
        price: '0.99',
        category: 'Breakfast'
    },  
    ]

   before(() => {
     db = knex({
       client: 'pg',
       connection: process.env.TEST_DB_URL,
    })
   })

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
         return db
           .into('shoppingList')
           .insert(testItems)
       })
       it(`getAllShoppingItems() resolves all items from 'shopping_list' table`, () => {
        // test that ShoppingListService.getAllShoppingItems gets data from table
        return ShoppingListService.getAllShoppingItems(db)
        .then(actual => {
        expect(actual).to.eql(testItems)
        })
        })
        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdTestItem = testItems[thirdId - 1]
            return ShoppingListService.getById(db, thirdId)
              .then(actual => {
                expect(actual).to.eql({
                  id: thirdId,
                  dated_added: thirdTestItem.date_added,
                  name: thirdTestItem.name,
                  category: thirdTestItem.catergory,
                  price: thirdTestItem.price,
                  checked: thirdTestItem.checked,
                })
              })
          })
          it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
                 const itemId = 3
                 return ShoppingListService.deleteItem(db, itemId)
                   .then(() => ShoppingListService.getAllShoppingItems(db))
                   .then(allItems => {
                     // copy the test articles array without the "deleted" article
                     const expected = testItems.filter(item => item.id !== itemId)
                     .map(item => ({
                        ...item,
                        checked: false,
                      }));
                     expect(allItems).to.eql(expected)
                   })
               })

               it(`updateItem()) updates an article from the 'shopping_list' table`, () => {
                     const idOfItemToUpdate = 3
                     const newItemData = {
                       date_added: new Date(),
                       name: 'updated name',
                       category: 'updated category',
                       price: 'updated price',
                       checked: true,
                     }
                     return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                       .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                       .then(item => {
                         expect(item).to.eql({
                           id: idOfItemToUpdate,
                           ...newItemData,
                         })
                       })
                   })
    })
    context(`Given 'shopping_list' has no data`, () => {
           it(`getAllShoppingItems() resolves an empty array`, () => {
             return ShoppingListService.getAllShoppingItems(db)
               .then(actual => {
                 expect(actual).to.eql([])
               })
           })
              it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
                const newItem = {
                        date_added: new Date('2020-01-01T00:00:00.000Z'),
                        name: 'Test new name',
                        category: 'Test new category',
                        price: 'Test new price',
                        checked: true,
                      }
                      return ShoppingListService.insertItem(db, newItem)
                      .then(actual => {
                              expect(actual).to.eql({
                                id: 1, 
                                date_added: new Date(newItem.date_added),
                                name: newItem.name,
                                category: newItem.catergory,
                                price: newItem.price,
                                checked: newItem.checked,
                                
                              })
                            })
            
               })
         })
         
})