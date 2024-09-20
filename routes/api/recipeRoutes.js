const express = require("express");
const authenticate = require('../../middlewares/authenticate')
const recipeController = require('../../controllers/recipeController')
const router = express.Router();
const {validateBody} = require('../../middlewares/validateBody')
const schemas = require('../../schemas/validation')
const {checkReqParams} = require('../../helpers')

router.use(authenticate)

/**
 * @openapi
 * tags:
 *  name: Recipes
 *  description: Recipes routes to manage recipes
 */

/**
 * @openapi
 * /recipes:
 *  get:
 *    summary: Allows user and applicaion to get all recipes from db
 *    tags: [Recipes]
 *    responses:
 *      200:
 *        description: Data loaded successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  $ref: "#/components/schemas/Recipe"
 */

router.get('/', recipeController.getAllRecipes)

/**
 * @openapi
 * /recipes/category-list:
 *  get:
 *    summary: Allows application to get a last of recipes categories
 *    tags: [Recipes]
 *    responses:
 *      200:
 *        description: Lisr of categories loaded successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *              example: ["Beef", "Pork"]
 */

router.get('/category-list', recipeController.getCategoriesList)

/**
 * @openapi
 * /recipes/main-page:
 *  get:
 *    summary: Brings recipes for render on main page, returns by 4 recipes in 4 categories
 *    tags: [Recipes]
 *    responses:
 *      200:
 *        description: List of recipes' objects
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  mainpage:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string 
 *                        title:
 *                          type: string 
 *                        thumb:
 *                          type: string 
 *                        preview:
 *                          type: string 
 *                        category:
 *                          type: string
 */

router.get('/main-page', recipeController.mainPageRecipes)

/**
 * @openapi
 * /recipes/{category}:
 *  get:
 *    summary: Brings recipes for render on main page, returns by 4 recipes in 4 categories
 *    tags: [Recipes]
 *    parameters:
 *      - in: path
 *        name: category
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: List of recipes by defined category
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Category"
 */

router.get('/:category', checkReqParams, recipeController.getRecipeByCategory)

/**
 * @openapi
 * /recipes/{id}:
 *  get:
 *    summary: Brings recipes for render on main page, returns by 4 recipes in 4 categories
 *    tags: [Recipes]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: List of recipes by defined category
 *        content:
 *          application/json:
 *            schema:
 *                $ref: "#/components/schemas/Recipe"
 */

router.get('/:id', recipeController.getRecipeById)

module.exports = router;
