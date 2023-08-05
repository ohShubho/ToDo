const router = require('express').Router();
//import todo model 
const todoItemsModel = require('../models/todoItems');


//create first route --add Todo Item to database
router.post('/api/item', async (req, res)=>{
  try{
    const newItem = new todoItemsModel({
      item: req.body.item
    })
    //save this item in database
    const saveItem = await newItem.save()
    res.status(200).json(saveItem);
  }catch(err){
    res.json(err);
  }
})

router.get('/api/item', async (req, res)=>{
  try{
    const allTodoItems= await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  }catch(err){
    res.json(err);
  }
}); 
    
router.put('/api/item/:id', async (req, res)=>{
  try{
    //find the item by its id and update it
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json("Item updated");
  }catch(err){
    res.json(err);
  }
})

router.delete('/api/item/:id', async (req, res)=>{
  try{
    //find the item by its id and update it
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item deleted");
  }catch(err){
    res.json(err);
  }
})


module.exports = router;