import express from "express";
import cors from "cors";
import oracledb from "oracledb";

import pkg from 'oracledb';
const {autoCommit} = pkg;

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

app.listen(3355, () => {
    console.log("Server running on port 3355");
});

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

async function getConnection() {
    return await oracledb.getConnection({
        user: 'hr',
        password: 'happy',
        connectionString: "211.238.142.22/xe"
    });
}

app.get("/board/list_node", async (req, res) => {
    let conn;

    const page = parseInt(req.query.page as string) || 1;
    const rowSize = 10;
    const start = (page - 1) * rowSize;

    try {
        if (!conn) {
            conn = await getConnection();
        }
        const listSql = `SELECT no, subject, name, TO_CHAR(regdate, 'YYYY-MM-DD') as dbday, hit
                     FROM board_3 ORDER BY no DESC OFFSET ${start} ROWS FETCH NEXT 10 ROWS ONLY`
        const totalSql = 'SELECT CEIL(COUNT(*) / 12.0) AS totalpage FROM board_3'

        const result = await conn.execute(listSql);
        const total = await conn.execute(totalSql);

        const totalpage = (total.rows as {TOTALPAGE:number}[])[0].TOTALPAGE;

        res.json({
            curpage: page,
            totalpage,
            list: result.rows,
        });
    } catch (error) {

    } finally {
        if (conn) {
            await conn.close()
        }
    }
})

app.post("/board/insert_node", async (req, res) => {
    let conn;

    const {name, subject, content, pwd} = req.body;

    try {
        if (!conn) {
            conn = await getConnection();
        }
        const sql = `INSERT INTO board_3(no, name, subject, content, pwd)
            VALUES(BR3_NO_SEQ.NEXTVAL, :name, :subject, :content, :pwd)`

        await conn.execute(
            sql,
            {name, subject, content, pwd},
            {autoCommit: true}
        );

        res.json({msg: 'yes'})
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'no'});
    } finally {
        if (conn) {
            await conn.close()
        }
    }
})
// 상세 보기
app.get("/board/detail_node", async (req, res) => {
    let conn;

    const no = req.query.no || 1

    try {
        if (!conn) {
            conn = await getConnection();
        }
        let sql = `UPDATE board_3 SET hit = hit + 1 WHERE no = ${no}`
        await conn.execute(sql);

        sql =`
            SELECT no, subject, TO_CHAR(content) as content, name, hit, TO_CHAR(regdate, 'YYYY-MM-DD') AS dbday FROM board_3 WHERE no = ${no}
            `
        const result = await conn.execute(sql)
        res.json(result.rows?.[0])
    } catch (e) {
        console.error(e);
    } finally {
        if (conn) {
            await conn.close()
        }
    }
})