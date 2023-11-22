const express=require('express');
// const cors=require('cors');
// const User=require('./config');
const app=express();
const admin=require('firebase-admin');
const credentials=require('./key.json');
// const { async } = require('@firebase/util');
const bodyParser =require('body-parser');
const { async } = require('@firebase/util');

admin.initializeApp({
    credential:admin.credential.cert(credentials)
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db=admin.firestore();

app.post("/create",async(req,res)=>{
    try {
        console.log(req.body);
        const id=req.body.email;
        const userJson={
            email:req.body.email,
            // password:req.body.password,
            name:req.body.name,
            // phoneNumber:req.body.phoneNumber,
        };
        const response= await db.collection("users").add(userJson);
        res.status(200).json({
            success: true,
            message: "Get user list successfully!",
            data: userJson,
          });
    } catch (error) {
        res.send(error);
    }
});

app.get('/read/all',async(req,res)=>{
    try {
        const usersRef=db.collection("users");
        const response=await usersRef.get();
        console.log(response)
        let responseArr=[];
        response.forEach(doc=>{
            // responseArr.push({id: doc.id , ...doc.data() });
            responseArr.push(doc.data()) ;
        });
        // console.log(responseArr)
        res.status(200).json({
            success: true,
            message: "Get user list successfully!",
            data:responseArr,
          });
    } catch (error) {
        res.send(error)
    }
})

app.get('/get/:id',async(req,res)=>{
    try {
        const usersRef=db.collection("users").doc(req.params.id);
        const response=await usersRef.get();
        res.status(200).json({
            success: true,
            message: "Get user list successfully!",
            data:response,
          });
        } catch (error) {
            res.send(error)
        }
        // const usersRef = db.collection('users').where('email','==', req.params.id);
})

app.post('/update',async(req,res)=>{
    try {
        const id=req.body.id;
        const newname="helo";
        const userRef=await db.collection("users").doc(id)
        .update({
            name:newname
        });
        res.status(200).json({
            success: true,
            message: "Get user list successfully!",
            data:userRef,
          });
    } catch (error) {
        res.send(error)
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try {
        const response=await db.collection("users").doc(req.params.id).delete();
        res.status(200).json({
            success: true,
            message: "Get user list successfully!",
            data:response,
          });
    } catch (error) {
        res.send(error)
    }
})

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
// let users=[];
// db.collection("users").get().then((querySnapshot)=>{
//     querySnapshot.forEach((doc)=>{
//         let data={};
//         data[doc.id]=doc.data()
//         users.push(data);
//         })
//         })
//         function getUsers(){
//             return new Promise ((resolve,reject)=> {
//                 resolve(users);
//                 });
//                 }
//                 function addUser(name,email){
//                     // console.log(req.body);
//                     if(!name || !email){
//                         reject('Please fill all the fields')
//                         }else{
//                             let user = { name , email };
//                             users.push(user);
//                             saveToDB(user).then(()=>{
//                                 res.send('Data saved to database');
//                                 }).catch((err)=>{
//                                     console.error(err);
//                                     res.status(500).send('Error while saving to DB');
//                                     });
//                                     }
//                                     }
//                                     function saveToDB(user){
//                                         return new Promise((resolve,reject)=>{
//                                             db.collection('users').add(user).then((ref)=>{
//                                                 delete user['.sv'];
//                                                 user.id=ref.id;
//                                                 resolve(user);
//                                                 }).catch((err)=>{
//                                                     reject(err);
//                                                     })
//                                                     })
//                                                     }
//                                                     module.exports={getUsers,addUser}   


// app.post("/create",async(req,res)=>{
//     const data=req.body
//     console.log("data user check",data)
//     // await User.add(data)
//     res.send({msg:"User add"})
// })

// app.listen(4000,()=>console.log("server runnin on port"))