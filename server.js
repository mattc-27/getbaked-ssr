const express = require("express");

const pool = require('./db.js');
const path = require("path");
const fs = require("fs/promises");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  methods: 'GET, POST, PUT',
  allowedHeaders: 'Content-Type,Authorization'
};

const app = express();
app.use(compression());
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// Static file setup
app.use(express.static(path.join(__dirname, "dist")));



app.get("/api/backend_test", async (req, res) => {
  try {
    const result = await pool.query(
      "select * from recipes"
    )
    res.send({ recipes: result.rows });
  } catch (error) {
    console.error(error.message);
  }
});



app.get("/api/backend_test_two/:recipe_name", async (req, res) => {

  const { recipe_name } = req.params;

  try {
    // Fetch main recipe details to get the recipe_id
    const lookupRecipe = await pool.query("SELECT * FROM recipes WHERE recipe_name = $1", [recipe_name]);
    const mainRecipe = lookupRecipe.rows[0];

    if (!mainRecipe) {
      // Handle case where mainRecipe is undefined (recipe_name not found)
      return res.status(404).json({ error: 'Recipe not found' });
    } const recipe_id = mainRecipe.id; // Assuming 'id' is the primary key in the 'recipes' table

    console.log(mainRecipe);

    if (recipe_id) {
      // Fetch ingredients for main recipe using the recipe_id
      const lookupIng = await pool.query(
        `SELECT id, name AS ingredient_name, quantity, unit FROM ingredients WHERE recipe_id = $1 ORDER BY id ASC`, [recipe_id]
      );
      const ingredients = lookupIng.rows;

      // Fetch instructions for main recipe using the recipe_id
      const lookupInst = await pool.query(
        `SELECT id, step, instruction FROM instructions WHERE recipe_id = $1 ORDER BY step ASC`, [recipe_id]
      );
      const instructions = lookupInst.rows;

      // Fetch images for main recipe using the recipe_id (assuming 'recipe_images' table exists with 'image' column)
      const lookupImages = await pool.query(
        `SELECT image FROM recipe_images WHERE recipe_id = $1`, [recipe_id]
      );
      const images = lookupImages.rows;

      // Fetch sub-recipes and their ingredients for main recipe using the recipe_id
      const recipeOptions = await pool.query(
        `SELECT
          sr.id AS sub_recipe_id,
          sr.created_at AS sub_recipe_created_at,
          sr.title AS sub_recipe_title,
          sr.recipe_id AS recipe_id,
          json_agg(si.*) AS sub_ingredients
      FROM
          sub_recipes sr
      LEFT JOIN
          sub_ingredients si ON sr.id = si.sub_recipe_id
      WHERE
          sr.recipe_id = $1
      GROUP BY sr.id`, [recipe_id]
      );


      res.status(200).send({
        success: true,
        mainRecipe, ingredients, instructions,
        /*       ingredients,
        instructions}, */
        options: recipeOptions.rows,
        images
      })
    }
  } catch (error) {
    console.group(error)
    return res.status(500).json(error);

  }
});


app.get("/api/other_test", async (req, res) => {
  try {
    res.send(JSON.stringify({ Express: 'Back end is connected' }));
  } catch (error) {
    console.error(error.message);
  }
});




// Route for serving HTML files
app.use("*", async (req, res) => {
  let url = req.originalUrl;
  let appDirectory = url.startsWith("/blog") ? "blog" : "";
  let htmlFileToLoad = path.join("dist", appDirectory, "index.html");

  try {
    let html = await fs.readFile(path.join(__dirname, htmlFileToLoad), "utf8");
    res.setHeader("Content-Type", "text/html");
    return res.status(200).end(html);
  } catch (error) {
    console.error(error.stack);
    return res.status(500).end(error.stack);
  }
});


// Setup default port
app.set('port', process.env.PORT || 3000);

// Start express app
app.listen(app.get('port'), () => {
  console.log(`Server running at port: ${app.get('port')}`)
});

