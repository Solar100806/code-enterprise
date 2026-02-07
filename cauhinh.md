<!-- Cấu hình dự án nodeJS -->

<!-- Bước 1: -->

npm i -g pnpm

<!-- Bước 2: -->

npm init -y

<!-- Bước 3: -->

pnpm add express mongoose cors bcryptjs jsonwebtoken dotenv morgan joi

<!-- Bước 4: -->

pnpm add -D @babel/core @babel/node @babel/preset-env nodemon

<!-- Bước 5: Tạo file .babelrc -->

{
"presets": [
[
"@babel/preset-env",
{
"targets": {
"node": "current"
}
}
]
]
}

<!-- Bước 6: Thêm script vào package.json để chạy dự án -->

"scripts": {
"dev": "nodemon --exec babel-node src/app.js"
}

<!-- Bước 7: Tạo file .env với nội dung: -->

MONGO_URI=mongodb://localhost:27017/Tên-tự-đặt
PORT=3000
JWT_SECRET=Tên-tự-đặt

<!-- Bước 8: Cấu hình .gitignore -->

node_modules/
.env
dist/
