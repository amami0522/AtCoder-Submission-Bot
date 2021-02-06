const fetch = require('node-fetch')

const users = ["mitsui321"];
let submissions = [];
let problems = [];
let contests = [];

async function get(url) {
    const response = await fetch(url);
    return response.json();
}

async function getAll() {
    // 1分前のUNIX秒を取得する
    const unixTimeSecond = Math.floor(Date.now() / 1000);
    const minuteAgo = unixTimeSecond - 60;

    // 1分前からの提出一覧を取得
    submissions = await get("https://kenkoooo.com/atcoder/atcoder-api/v3/from/" + minuteAgo);

    // 問題一覧を取得
    problems = await get("https://kenkoooo.com/atcoder/resources/problems.json");

    // コンテスト一覧を取得
    contests = await get("https://kenkoooo.com/atcoder/resources/contests.json");
}

async function getSubmission() {
    await getAll();
    for(let i = 0; i < submissions.length; i++) {
        const userName = submissions[i]["user_id"];
        const problem = submissions[i]["problem_id"];
        const result = submissions[i]["result"];
        console.log(userName + "さんが" + problem + "を" + result + "しました");
    }
}

try {
    getSubmission();
}
catch(e) {
    console.log(e);
}