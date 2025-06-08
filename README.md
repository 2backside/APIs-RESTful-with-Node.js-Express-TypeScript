npm init -y

npm i express

npm i -D @tsconfig/recommended @types/express @types/node tsc-watch typescript

npx tsc --init

npx tsc-watch --onSuccess \"node ./lib/index.js\"
