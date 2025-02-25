const db = require("./conexao.js");
const AWS = require('aws-sdk');
const UUID = require('uuid');
const fs = require('fs');

// Criar Imagem
const criarImagem = (idUsuario, imagem) => {
    return new Promise((resolve, reject) => {
        const referencia = UUID.v4();

        // Chama a função de upload para a S3
        enviarParaAws(imagem, referencia)
    
        // Upload para o banco
        .then(() => {
                const sql = "INSERT INTO tb_imagensaws (referencia, idUsuario) VALUES (?, ?)";
                db.query(sql, [referencia, idUsuario], (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(new Error("Erro ao criar imagem!"));
                    } else {
                        resolve(results);
                    }
                });
            })
            .catch((err) => {
                console.error('Erro no upload para o S3:', err);
                reject(new Error("Erro ao fazer upload para o S3!"));
            });
    });
};

// Configurações
AWS.config.update({
    region: 'us-west-1',
    accessKeyId: 'SEU_ACCESS_KEY',
    secretAccessKey: 'SEU_SECRET_KEY'
});

// Criação a instância do S3
const s3 = new AWS.S3();

// Upload de uma imagem para o S3
const enviarParaAws = (filePath, referencia) => {
    return new Promise((resolve, reject) => {
        const fileContent = fs.readFileSync(filePath);

        const params = {
            Bucket: 'bucketmi74',
            Key: referencia,
            Body: fileContent,
            ContentType: 'image/jpeg'
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Erro ao fazer o upload!');
                reject(err);
            } else {
                console.log('Upload feito com sucesso!');
                resolve(data);
            }
        });
    });
};

// Buscar imagem do S3
const buscarImagem = (referencia) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'bucketmi74',
            Key: referencia
        };

        s3.getObject(params, (err, data) => {
            if (err) {
                console.error('Erro ao buscar imagem do S3:', err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = { criarImagem, buscarImagem };