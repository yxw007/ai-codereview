# AI-CodeReview

## Create Sample project
```bash
cd ..
mkdir test-repo
cd test-repo
echo "console.log('hello')" > main.js
git init
git add .
git commit -m "init project"
echo "" >> main.js
echo "function query(input){" >> main.js
echo "    return \`SELECT * FROM users WHERE id = \${input}\`;" >> main.js
echo "}" >> main.js
git add .
git commit -m "add query"
```

## Test run
```bash
node src/index.js "/e/Project/test-repo" "6146ef88ddac18ccf501e7039fdc17b01f64fb3b" "3abee20ecb6b098580c17da750d49b8778b794d2"
```

## Resource
- Model url: [SSK-DNB_-_TinyLlama-1.1B-intermediate-step-1431k-3T-code_contests_v0.15](https://huggingface.co/RichardErkhov/SSK-DNB_-_TinyLlama-1.1B-intermediate-step-1431k-3T-code_contests_v0.15-gguf)

## Platform
- Model download: [https://huggingface.co](https://huggingface.co)
