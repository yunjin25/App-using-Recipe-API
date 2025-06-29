import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(express.json());

// 홈 (/)
app.get('/', (req, res) => {
  res.render('home');
});

// /recipes
app.get('/recipes', async (req, res) => {
  const ingredient = req.query.ingredient || 'chicken_breast';

  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data from API');
    }

    const data = await response.json();

    res.render('recipes', { ingredient, meals: data.meals || [] });
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
