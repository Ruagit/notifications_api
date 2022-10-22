import app from './server';

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
  });


  