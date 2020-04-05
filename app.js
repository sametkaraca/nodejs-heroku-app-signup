const express = require(`express`)
const request = require(`request`)
const bodyParser = require(`body-parser`)
const https = require('https')

const port = 3000
const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
  
app.get('/', (req,res)=> res.sendFile(__dirname + '/signup.html'))

app.post('/', (req,res)=>{

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email  

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = 'https://us20.api.mailchimp.com/3.0/lists/d5f5ef35a1'
    
    const options = {
        method: 'POST',
        auth: 'sam1:e479b3ea6595891ed4b7b836ea78e18d-us20'
    }

    const request = https.request(url, options, response=>{

        response.statusCode === 200 ? res.sendFile(__dirname + '/success.html') : res.send(__dirname +'/failure.html')

        response.on('data', data=>{
           // console.log(JSON.parse(data));
        })
    })

    request.write(jsonData)
    request.end()
})

app.post('/failure', (req,res)=>{
    res.redirect('/')
})


app.listen(process.env.PORT || 3000, ()=>console.log(`The server listens ${port}...`))

//e479b3ea6595891ed4b7b836ea78e18d-us20