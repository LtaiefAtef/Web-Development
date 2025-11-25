const sql = require('better-sqlite3');
const db = sql('meals.db');
const menu = [
    // Pizza
    { title: "Pepperoni Pizza", type: "Food", tag: "Pizza", rating: 4.5, description: "Pizza topped with spicy pepperoni and mozzarella cheese.", need: "" ,src:null},
    {title: "Pizza Margherita",type: "Food",tag: "Pizza",rating: 4.5,description: "Classic Italian pizza topped with fresh mozzarella. A drizzle of olive oil enhances the flavors.",need: "",src:null},
    { title: "BBQ Chicken Pizza", type: "Food", tag: "Pizza", rating: 4.6, description: "Loaded with barbecue chicken, onions, and cheddar.", need: "" ,src:null},
    { title: "Veggie Pizza", type: "Food", tag: "Pizza", rating: 4.2, description: "Topped with bell peppers, mushrooms, and olives.", need: "" ,src:null},
    { title: "Hawaiian Pizza", type: "Food", tag: "Pizza", rating: 4.3, description: "A tropical delight with pineapple and ham.", need: "" ,src:null},
    { title: "Four Cheese Pizza", type: "Food", tag: "Pizza", rating: 4.7, description: "A blend of mozzarella, cheddar, parmesan, and gouda.", need: "" ,src:null},
    // Wings
    { title: "Buffalo Wings", type: "Food", tag: "Wings", rating: 4.3, description: "Spicy buffalo sauce-coated wingsdfsdfsdsfsfdsfdsfdsfsfsdfdsfsddddddddddddddddddddddddddddddddddddddddddddddddddd.", need: "" ,src:null},
    { title: "Garlic Parmesan Wings", type: "Food", tag: "Wings", rating: 4.6, description: "Crispy wings tossed in garlic and parmesan.", need: "" ,src:null},
    { title: "Honey Mustard Wings", type: "Food", tag: "Wings", rating: 4.4, description: "Sweet and tangy honey mustard glaze.", need: "" ,src:null},
    { title: "Teriyaki Wings", type: "Food", tag: "Wings", rating: 4.5, description: "Savory and sweet teriyaki-glazed wings.", need: "" ,src:null},
    { title: "Lemon Pepper Wings", type: "Food", tag: "Wings", rating: 4.7, description: "Zesty wings with a lemon and pepper seasoning.", need: "" ,src:null},
    {title: "Chicken Wings",type: "Food",tag: "Wings",rating: 4.2,description: "Juicy chicken wings, fried to perfection. Served with a side of tangy dipping sauce.",need: "",src:null},
    // Burger
    { title: "Cheeseburger", type: "Food", tag: "Burger", rating: 4.6, description: "Classic beef patty with melted cheese and ketchup.", need: "" ,src:null},
    { title: "Bacon Burger", type: "Food", tag: "Burger", rating: 4.5, description: "Topped with crispy bacon and barbecue sauce.", need: "" ,src:null},
    { title: "Veggie Burger", type: "Food", tag: "Burger", rating: 4.2, description: "Made with a plant-based patty and fresh veggies.", need: "" ,src:null},
    { title: "Spicy Chicken Burger", type: "Food", tag: "Burger", rating: 4.8, description: "Crispy chicken with spicy mayo.", need: "" ,src:null},
    { title: "Mushroom Swiss Burger", type: "Food", tag: "Burger", rating: 4.6, description: "Beef patty topped with Swiss cheese and mushrooms.", need: "" ,src:null},
    {title: "Burger Deluxe",type: "Food",tag: "Burger",rating: 4.7,description: "A double-stacked beef burger with melted cheese. Comes with crispy lettuce and a special sauce.",need: "",src:null},
    // Salad
    { title: "Greek Salad", type: "Food", tag: "Salad", rating: 4.3, description: "Tomatoes, cucumbers, and feta cheese.", need: "" ,src:null},
    { title: "Cobb Salad", type: "Food", tag: "Salad", rating: 4.5, description: "Lettuce with eggs, bacon, and avocado.", need: "" ,src:null},
    { title: "Fruit Salad", type: "Food", tag: "Salad", rating: 4.2, description: "A mix of seasonal fresh fruits.", need: "" ,src:null},
    { title: "Tuna Salad", type: "Food", tag: "Salad", rating: 4.4, description: "Salad greens with a creamy tuna topping.", need: "" ,src:null},
    { title: "Quinoa Salad", type: "Food", tag: "Salad", rating: 4.6, description: "Healthy quinoa with fresh vegetables.", need: "" ,src:null},
    {title: "Caesar Salad",type: "Food",tag: "Salad",rating: 4.0,description: "Crisp romaine lettuce topped with croutons. Tossed in a creamy Caesar dressing.",need: "",src:null},
    // Drinks - Juice
    { title: "Apple Juice", type: "Drinks", tag: "Juice", rating: 4.3, description: "Freshly pressed apple juice.", need: "" ,src:null},
    { title: "Grape Juice", type: "Drinks", tag: "Juice", rating: 4.4, description: "Rich and sweet grape juice.", need: "" ,src:null},
    { title: "Pineapple Juice", type: "Drinks", tag: "Juice", rating: 4.5, description: "Tropical pineapple flavor.", need: "" ,src:null},
    { title: "Carrot Juice", type: "Drinks", tag: "Juice", rating: 4.2, description: "Nutrient-rich carrot juice.", need: "" ,src:null},
    { title: "Mixed Berry Juice", type: "Drinks", tag: "Juice", rating: 4.6, description: "A blend of fresh berries.", need: "" ,src:null},
    {title: "Orange Juice",type: "Drinks",tag: "Juice",rating: 4.3,description: "Freshly squeezed orange juice. Packed with vitamins and refreshing flavor.",need: "",src:null},
    // Drinks - Coffee
    {title: "Espresso Coffee",type: "Drinks",tag: "Coffee",rating: 4.8,description: "Rich and aromatic espresso shot. The perfect pick-me-up for coffee lovers.",need: "",src:null},
    { title: "Latte", type: "Drinks", tag: "Coffee", rating: 4.7, description: "Smooth espresso with steamed milk.", need: "" ,src:null},
    { title: "Cappuccino", type: "Drinks", tag: "Coffee", rating: 4.6, description: "Rich coffee topped with frothy milk.", need: "" ,src:null},
    { title: "Americano", type: "Drinks", tag: "Coffee", rating: 4.4, description: "Espresso diluted with hot water.", need: "" ,src:null},
    { title: "Mocha", type: "Drinks", tag: "Coffee", rating: 4.5, description: "Espresso with chocolate and milk.", need: "" ,src:null},
    { title: "Iced Coffee", type: "Drinks", tag: "Coffee", rating: 4.3, description: "Cold coffee with ice and milk.", need: "" ,src:null},
    // Drinks - Milkshake
    {title: "Chocolate Milkshake",type: "Drinks",tag: "Milkshake",rating: 4.6,description: "Creamy milkshake blended with rich chocolate. Topped with whipped cream and sprinkles.",need: "",src:null},
    { title: "Vanilla Milkshake", type: "Drinks", tag: "Milkshake", rating: 4.6, description: "Classic vanilla flavor.", need: "" ,src:null},
    { title: "Strawberry Milkshake", type: "Drinks", tag: "Milkshake", rating: 4.4, description: "Creamy and fruity strawberry.", need: "" ,src:null},
    { title: "Oreo Milkshake", type: "Drinks", tag: "Milkshake", rating: 4.7, description: "Made with crushed Oreo cookies.", need: "" ,src:null},
    { title: "Banana Milkshake", type: "Drinks", tag: "Milkshake", rating: 4.5, description: "Smooth banana flavor.", need: "" ,src:null},
    { title: "Peanut Butter Milkshake", type: "Drinks", tag: "Milkshake", rating: 4.3, description: "Creamy with peanut butter.", need: "" ,src:null},
    // Tacos
    { title: "Beef Tacos", type: "Food", tag: "Tacos", rating: 4.6, description: "Tacos filled with seasoned beef.", need: "" ,src:null},
    { title: "Chicken Tacos", type: "Food", tag: "Tacos", rating: 4.5, description: "Grilled chicken and fresh toppings.", need: "" ,src:null},
    { title: "Shrimp Tacos", type: "Food", tag: "Tacos", rating: 4.7, description: "Tacos stuffed with grilled shrimp.", need: "" ,src:null},
    { title: "Vegetarian Tacos", type: "Food", tag: "Tacos", rating: 4.3, description: "Filled with beans and grilled vegetables.", need: "" ,src:null},
    { title: "Pork Tacos", type: "Food", tag: "Tacos", rating: 4.4, description: "Slow-cooked pork with salsa.", need: "" ,src:null},
    {title: "Fish Tacos",type: "Food",tag: "Tacos",rating: 4.4,description: "Soft tortillas filled with grilled fish. Garnished with fresh salsa and creamy sauce.",need: "",src:null},
];
db.prepare(`
    CREATE TABLE meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,       
    type VARCHAR(50) NOT NULL,         
    tag VARCHAR(50) NOT NULL,          
    rating FLOAT DEFAULT NULL,         
    description TEXT,                  
    need TEXT,                         
    src VARCHAR(255) DEFAULT NULL
)
    `).run();
async function initData(){
    const stmt=db.prepare(`
            INSERT INTO meals VALUES (
            null,
            @title,
            @type,
            @tag,
            @rating,
            @description,
            @need,
            @src
        )`)
    for(const meal of menu){
        stmt.run(meal);
    }
}
initData();
