import express from "express";
import axios from "axios";

//Express app and port number set up.
const app = express();
const port = 3000;

//API Root URL
const API_URL= "https://programming-quotesapi.vercel.app/api/";

//Use "public" folder for static files 
app.use(express.static("public"));


app.get("/", async (req, res) => {
    try {
        //Get a random quote from the API
        const response = await axios.get(API_URL + "random");
        res.render("index.ejs", {quote:response.data.quote, author:response.data.author});
      } catch (error) {
        //Let the user know something is wrong with the server, using Server error(500)
        res.status(500);
        const m=JSON.parse(error.response.data.message);
        //error.response.data contains any error messages from the API
        //Render error code and message from the API and display it to the user.
        res.render('error.ejs', {message:m.error, status:m.status});
        console.log(error.response.data);
      }
});

app.get("/next", (req, res) => {
  res.redirect('/');
});

//Start the server and listen on predifined port.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });