import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.json());

// 루트 경로에 대한 처리 (홈페이지처럼 사용)
app.get('/', (req, res) => {
  res.send('Welcome to the Recipe API!');
});

// 기본 레시피 검색 라우트 (chicken_breast)
app.get('/recipes', async (req, res) => {
  const ingredient = 'chicken_breast';
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data from API');
    }

    const data = await response.json();
    if (!data.meals) {
      return res.status(404).send('No meals found for this ingredient');
    }

    res.status(200).json(data.meals);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Server Error');
  }
});

// 사용자 입력 재료로 레시피 검색 라우트
app.get('/recipes/:ingredient', async (req, res) => {
  const ingredient = req.params.ingredient;
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data from API');
    }

    const data = await response.json();
    if (!data.meals) {
      return res.status(404).send('No meals found for this ingredient');
    }

    res.status(200).json(data.meals);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Server Error');
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
