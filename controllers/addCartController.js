
// importing firebase database 
const { FieldValue, DocumentSnapshot } = require('firebase-admin/firestore');
const { db } = require('../models/firebase.js');

exports.addCartController = (req,res)=>{
    const id = req.query.product;
    const name = req.query.name;
    const cost = req.query.cost;
    const img = req.query.img;
    const quantity = req.query.quantity;
    const val = parseInt(id)
    try{
        const cartRef = db.collection('cart').doc(id)
        cartRef.get().then((DocumentSnapshot)=>{
            if(DocumentSnapshot.exists){
               res.render("home")
            }
            else{
                const responser = cartRef.set({
                    name:name,cost:cost,img:img,id:id,quantity:quantity
                 });
                res.render("home");
            }
        })
     }catch(error){
         res.send(error);
   }
}