const express = require('express')
const upload = require('express-fileupload')
const app = express()
app.use(upload())
app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html')    
})
app.post('/', (req, res)=> {
    if (req.files) {
       console.log(req.files)
       var file = req.files.file
       var filename = file.name
       console.log(filename)
       const xlsx = require('xlsx')
       
       var wb = xlsx.readFile(filename)
       var ws = wb.Sheets["Sheet1"]
       var data = xlsx.utils.sheet_to_json(ws)
       
       console.log(data)
                  
       file.mv('./uploads/' + filename, function(err){
           if (err){
               res.send(err)
           } else {
               res.send(data)
           }
       })
    }
})
app.listen(8000)
