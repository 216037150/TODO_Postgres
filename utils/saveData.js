import db from '../dataBase/dataBaseConnection.js';

async function saveTask(description, date) {
    const query = `INSERT INTO tasks(description, date) VALUES ($1, $2) RETURNING *;`;
    try {
        console.log("Inserting task:", description, date); 
        const result = await db.query(query, [description, date]);
        console.log("Inserted row:", result.rows[0]); 
        return result.rows[0];
    } catch (error) {
        console.error("Error during database insert:", error.message);
        throw new Error("Failed to save task to the database");
    }
}

export { saveTask };  
