<!-- Đoạn code mẫu trong file .babelrc -->

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

<!-- Lệnh 1 (Thư viện chính - Dependencies): -->

pnpm add express mongoose cors bcryptjs jsonwebtoken dotenv morgan joi

<!-- Lệnh 2 (Thư viện hỗ trợ dev - DevDependencies): -->
pnpm add -D @babel/core @babel/node @babel/preset-env nodemon