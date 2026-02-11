import cors from "cors";
import express from "express";
import oracledb from "oracledb";
import pkg from 'oracledb';
const {autoCommit} = pkg;

const app = express();

app.use(express.json());
app.listen(3355, () => {
    console.log("Server running on port 3355");
});

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

async function getConnection() {
    return await oracledb.getConnection({
        user: 'hr',
        password: 'password',
        connectionString: process.env.DATABASE_URL,
    });
}