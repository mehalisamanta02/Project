const express = require('express');
const Joi = require('joi');
const app = express(); //Create Express Application
app.use (express.json()) ; //used the json file 

const users = [
    {name: 'George', id: 1, mobile: '8596746126', dob: '2001 - 09 - 08'},
    {name: 'Josh', id: 2, mobile: '9296565126', dob: '2003 - 05 - 22'},
    {name: 'Riya', id: 3,  mobile: '9856746126', dob: '2000 - 10 - 02'},
    {name: 'Vincent', id: 4, mobile: '8597469312', dob: '2001 - 01 - 16'},
    {name: 'Madhu', id: 5, mobile: '6253741256', dob: '2005 - 09 - 25'}
]

//Read Request Handlers
// Display the Message when the URI consist of '/'
app.get('/', (req, res) => {
    res.send ('Welcome to REST API!');
});
// Display the List Of users when URL consists of api users
app.get('/api/users', (req,res) => {
    res.send(users);
});
// Display the Information Of Specific Customer when you mention the id.
app.get('api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) res.status(404).send('<h2 style="font-famly: Malgun Gothic; color: darkred;"> Cannot find what you are looking for</h2>');
    res.send(user);
});

//CREATE Request Handler
//CREATE New User Information
app.post('/api/users', (reg, res)=> {
    const { error } = validateUser(reg.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.send(user);
});

// UPDATE existing user information
app.put('/api/users/:id', (reg, res)=> {
    const user = users.find(c=> c.id === parseInt(req.params.id));
    if (!user) res.status(404).send('<h2 style="font-famly: Malgun Gothic; color: darkred;"> Cannot find what you are looking for</h2>');
    const { error } = validateUser(reg.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    user.name = req.body.name;
    res.send(user);
});


// DELETE user details
app.delete('/api/users/:id', (reg, res)=> {
    const user = users.find(c=> c.id === parseInt(req.params.id));
    if (!user) res.status(404).send('<h2 style="font-famly: Malgun Gothic; color: darkred;"> Cannot find what you are looking for</h2>');
    const index = users.indexOf(user);
    users.splice(index,1);
    res.send(user);
});


//Validate Information
function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(user, schema);
}

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port ${port}...'));