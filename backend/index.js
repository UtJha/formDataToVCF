// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer');
const VCard = require('vcf');
const Data = require('./models/Data');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://adityakher303:Aditya%409811@socialapp.fhjlstw.mongodb.net/?retryWrites=true&w=majority&appName=SocialApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.post('/api/data', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const { query } = req.query;
    const searchQuery = query
      ? { name: new RegExp(query, 'i') }
      : {};
    const data = await Data.find(searchQuery);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/data/csv', async (req, res) => {
  try {
    const data = await Data.find();
    const csvWriter = createObjectCsvWriter({
      path: 'data.csv',
      header: [
        { id: '_id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'message', title: 'Message' },
      ],
    });
    await csvWriter.writeRecords(data);
    res.download('data.csv');
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to download data in VCF format
app.get('/api/data/vcf', async (req, res) => {
    try {
      const data = await Data.find();
  
      // Create VCF content
      const vCards = data.map((item) => {
        const vCard = new VCard();
        vCard.set('fn', item.name); // Full name
        vCard.set('email', item.email); // Email address
        vCard.set('note', item.message); // Note or message
        return vCard.toString();
      });
  
      // Combine all vCards into one file
      const vcfContent = vCards.join('\n');
      res.setHeader('Content-Type', 'text/vcard');
      res.setHeader('Content-Disposition', 'attachment; filename="data.vcf"');
      res.send(vcfContent);
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
