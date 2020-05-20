const fs = require("fs").promises;
const crypto = require("../src/util/crypto_base64");

fs.readFile(__dirname + "/../config/statosu_rsa.pem").then(pri_key => {
    const text = "R4XrryhtHcWcQ7UvouMo9B++wo/uQYKpcqTi5M3RAtFsyd7YR4jdR+5T/b9xNItsUcBFOfXcAkT3cA4xFHs5t9SVPcFbQkk9UFiMgf7F1SsME7Dc81pfHUSEgw2whWwRjE4g2K2SsazabEx+OJv/Gjz/u3n05JIY0c7DvC/AOdM6PFL9fHvj4tV5ZN0cEXFGvz4qKyxwvPA63VxWeyj/hHxsEMkryWEVqG2MJA2q6ZHMCw5rj5K2ArOobwYDCHWuN5EhEHtCR2slVOVYldJXRMJ+WwLuLXeW/DvZc4AhQxKzZYBmsiRXlXjJnZWdWtP63iYAEnhrXfc0xPhzt3WHs9d46b7exEDCmUHG/JJm1vAn1LSBy/e16PmvBJgbjmRMfihaudWZLjD+ssLdkbdf5pbOPtUZsnWGiy+KQaSZn/4wewly1CLUOdoOMYtBBy6GBxY5pzTwfUSzlOcQ05zFq0UTzNGjdFAgbFGLGu1p3XSjIuV5l9VV8IW8sQgj2rDIhttfcpQGX5SJ8w3RGh/OvM5m23JWk/i55nDbvsp7ejob3ppooYQEXl/Kf+bfHxvGSeIBOlKtVkZWEkzY96nSYZueAdangvngGHlItyQ6ZOEJufJnAtkpXo2ryNJVGow8Phhfp1c698VpAnIPSUlOYGZdt2muV5QFG43N4u9fqmM=";

    console.log(crypto.decrypt(text, pri_key));
});