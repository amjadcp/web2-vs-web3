const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Handlebars = require('hbs');

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

const candidateSchema = new mongoose.Schema({
    ID: String,
    candidate: String,
    votes: { type: Number, default: 0 }
});

const Candidate = mongoose.model('candidate', candidateSchema);

const app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', async(req, res)=>{
    const candidates = await Candidate.find();
    return res.render('vote', {
        candidate1: candidates[0] ?? {},
        candidate2: candidates[1] ?? {},
    });
});

app.get('/result', async(req, res)=>{
    const candidates = await Candidate.find();
    let totalVotes = 0;
    for (const candidate of candidates) {
        totalVotes += candidate.votes;
    }
    return res.render('result', {
        totalVotes: totalVotes,
    });
});

app.get('/data', async(req, res)=>{
    const candidates = await Candidate.find();
    return res.json({
        candidate1: candidates[0] ?? {},
        candidate2: candidates[1] ?? {},
    });
});

app.post('/vote', async(req, res)=>{
    const { ID } = req.body;
    const candidate =await Candidate.findOneAndUpdate({ ID: ID }, { $inc: { votes: 1 } });
    return res.json(candidate);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});

