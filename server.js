const express = require('express')
const axios = require('axios');

const app = express()
const PORT = process.env.PORT || 3000;


app.get('/:formId/filteredResponses', (req, res) => {
    const formId = req.params.formId;
    const filterOptions = req.query.filters;

    try{
        const filterData = JSON.parse(filterOptions);
        if(!filterData){
            return res.status(400).json({ error: 'Missing filter parameters' }); 
        }

        axios.get(`https://api.fillout.com/v1/api/forms/${formId}`, {
            headers: {
                'Authorization': `Bearer sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912`
            },
            params: {
                filters: filterData
            }
        })
        .then((response)=>{
            res.status(200).json(response.data);
        })
        .catch((error)=>{
            res.status(500).json({ error: 'An Internal Server Error Occurs' });
        });
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});

app.listen(PORT, ()=>{
    console.log('Node API is runing on port http://localhost:3000');
})