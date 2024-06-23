import express from 'express'

const app =express()
// const hostname  = '127.0.0.2'
const port =3000

app.use(express.json())

let teaData = []
let nextId = 1

//Add new tea
app.post('/teas',(req,res)=>{
    const {name, price} = req.body
    const newTea = {id: nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)

})

//Get all teas
app.get("/teas",(req,res)=> {
    res.status(200).send(teaData)
})

//Get specific tea
app.get("/teas/:id",(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea){
        return res.status(404).send("tea not found!!")
    }
    res.status(200).send(tea)
})

//Update tea
app.put('/teas/:id',(req,res)=>{
    const teaId = req.params.id
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea){
        return res.status(404).send("Not found!!")
    }
    const {name,price }=req.body
    tea.name = name
    tea.price = price

    res.status(200).send(tea)
})

//Delete tea
app.delete('/teas/:id',(req,res)=>{
    const index =teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index ===-1){
        res.status(404).send("Tea Not found!!")
    }
    // const {name, price } =req.body
    // index.name = name
    teaData.splice(index,1)
    res.status(204).send(`Deleted`)
})

app.get("/",(req,res) => {
    res.send("Hello from Subu's CoolHotBuddy!!!")
}) 
app.get("/ice-tea",(req,res) => {
    res.send("What ice-tea would you prefer???")
})
app.get("/twitter",(req,res) => {
    res.send("Subavarshana.com")
}) 
app.get("/github",(req,res) => {
    res.send("https://github.com/subu0106")
}) 


app.listen(port,() => {
    console.log(`Server is running at port: ${port}...`)
})