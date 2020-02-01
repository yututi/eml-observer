const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const dataDir = path.resolve(__dirname, "data")
const simpleParser = require("mailparser").simpleParser

app.get("/api/files", async (req, res) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    const files = fs.readdirSync(dataDir)
    const mails = await Promise.all(files.map(async file => await getMailInfo(file)))
    res.send(mails)
})

const getMailInfo = async (file) => {
    const rs = fs.createReadStream(path.resolve(dataDir, file));
    // see https://nodemailer.com/extras/mailparser/
    const { subject, from, to, date } = await simpleParser(rs).catch(e => console.error(e))
    return {
        file,
        subject,
        from: from ? from.value : [],
        to: to ? to.value : [],
        date
    }
}

app.get("/files/:name", (req, res) => {
    res.sendFile(path.resolve(dataDir, req.params.name))
})

app.use(express.static("public"))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));