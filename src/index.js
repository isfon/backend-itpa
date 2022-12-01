import app from './app'
const mongoose = require("mongoose")

const conn_str = 'mongodb+srv://angel:angel123@cluster0.rlqxziz.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(
  conn_str,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    if (err) {
      console.log("error in connection");
    } else {
      console.log("mongodb is connected");
    }
  });

const { PORT = 2777 } = process.env
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) // eslint-disable-line no-console
