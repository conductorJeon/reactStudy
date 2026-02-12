import cors from "cors";
import express from "express";
import oracledb from "oracledb";
import pkg from 'oracledb';
const {autoCommit} = pkg;

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
}));

app.use(express.json());

app.listen(3355, () => {
    console.log('Server running on port 3355');
});

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

async function getConnection() {
    return await oracledb.getConnection({
        user: 'hr',
        password: 'password',
        connectionString: process.env.DATABASE_URL,
    });
}

// 목록 출력
app.get('/board/listNode', async (req, res) => {
    let conn;

    const page = parseInt(req.query.page as string) || 1;
    const rowSize = 10;
    const start = (page - 1) * rowSize;

    try {
        conn = await getConnection();

        const listSql = '';
        const totalPageSql = 'SELECT CEIL(COUNT(*) / 12.0) AS totalpage FROM board';

        const boardListSqlResult = await conn.execute(listSql);
        const totalPageSqlResult = await conn.execute(totalPageSql);

        const totalPage = (totalPageSqlResult.rows as {TOTALPAGE: number}[])[0].TOTALPAGE;

        res.json({
            curPage: page,
            totalPage,
            boardList: boardListSqlResult.rows
        });
    } catch (e) {
        console.log(e);
        res.json({res: 'error'});
    } finally {
        if (conn) {
            await conn.close();
        }
    }
})

app.post('/board/insertNode', async (req, res) => {
    let conn;

    const {name, subject, content, password} = req.body;

    try {
        conn = await getConnection();

        const insertSql = `INSERT INTO board(no, name, subject, content, password)
            VALUES(board_no_seq.NEXTVAL, :name, :subject, :content, :password)`

        await conn.execute(insertSql, {name, subject, content, password}, {autoCommit: true});

        res.json({res: 'ok'})
    } catch (e) {
        console.log(e);
        res.json({res: 'error'});
    } finally {
        if (conn) {
            await conn.close();
        }
    }
})

app.get('/board/detailNode', async (req, res) => {
    let conn;

    const no = req.query.no

    try {
        conn = await getConnection();

        const hitIncrementSql = `UPDATE board SET hit = hit + 1 WHERE no = ${no}`;
        await conn.execute(hitIncrementSql);

        const detailSql = ''
        const result = await conn.execute(detailSql);

        res.json(result.rows?.[0])
    } catch (e) {
        console.log(e);
        res.json({res: 'error'});
    } finally {
        if (conn) {
            await conn.close();
        }
    }
})

app.get('/board/updateOriginDetailNode', async (req, res) => {
    let conn;

    const no = req.query.no

    try {
        conn = await getConnection();

        const updateOriginDetailSql = ''
        const result = await conn.execute(updateOriginDetailSql);

        res.json(result.rows?.[0]);
    } catch (e) {
        console.log(e);
        res.json({res: 'error'});
    } finally {
        if (conn) {
            await conn.close();
        }
    }
})

app.put('/board/updateNode', async (req, res) => {
    let conn;

    const {no, name, subject, content, password} = req.body;

    try {
        conn = await getConnection();

        const passwordCheckSql = `SELECT COUNT(*) AS check FROM board WHERE no = ${no} AND password = ${password}`;
        const passwordCheckResult = await conn.execute(passwordCheckSql);
        const passwordCheck = (passwordCheckResult.rows as any[])[0].CHECK;

        if (passwordCheck === 0) {
            res.json({res: 'passwordWrong'});
            return
        }

    } catch (e) {
        console.log(e);
        res.json({res: 'error'});
    } finally {
        if (conn) {
            await conn.close();
        }
    }
})