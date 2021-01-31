const express = require('express')
const upload = require('express-fileupload')
const app = express()
const xlsx = require('xlsx')
const path = require('path')
const fs = require('fs')

app.use(upload()) 
app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html')    
})
app.post('/', (req, res)=> {
    if (req.files) {
       //console.log(req.files)
       var file = req.files.file
       var filename = file.name
       //console.log(filename)

       //finding extentions
       var ext = path.extname(filename)
       console.log(ext)

       if (ext == '.xlsx' || ext == '.xls') {
            var stats = fs.statSync(filename)
            var fileSizeInBytes = stats.size;
            // Converting the file size to megabytes
            var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
            console.log(fileSizeInMegabytes)
            if (fileSizeInMegabytes <=5 ) {
                var wb = xlsx.readFile(filename)
                var ws = wb.Sheets[wb.SheetNames[0]]
                var data = xlsx.utils.sheet_to_json(ws)
    
                file.mv('./uploads/' + filename, function(err){
                    if (err){
                        res.send(err)
                    } else {
                        res.send(data)
                    }
                })
            }

       } else {
           res.send("Please upload .xlsx or .xls files only")
       }
       //console.log(data)
                  
       
    }
})
app.listen(8000)
