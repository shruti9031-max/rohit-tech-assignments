import express from "express"
import cors from "cors"

const PORT = 8000

const app = express();

app.use(express());

app.get('/',(req,res)=>{
    res.send('response send')
})



app.listen(PORT,()=>{
    console.log(`server is running on  ${PORT}`)
})



