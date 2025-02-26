const db = require("./conexao.js");
const AWS = require('aws-sdk');
const UUID = require('uuid');
const path = require('path')
const fs = require('fs');

// Criar Imagem
const criarImagem = (idUsuario, imagem) => {
    return new Promise((resolve, reject) => {
        const referencia = UUID.v4();

        enviarParaAws(imagem, referencia)
    
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
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
});

// Criação a instância do S3
const s3 = new AWS.S3();

// Upload para o S3
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

// Buscar imagem da S3
const teste = (referencia) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'bucketmi74',
            Key: referencia
        };

        s3.getSignedUrl('getObject', params, (error, url) => {
            if (error) {
                reject(new Error('Erro ao buscar imagem! ' + error.message));
            } else {
                resolve({ url });
            }
        });
    });
};

// Buscar imagem da S3
const buscarImagem = (referencia) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'bucketmi74',
            Key: referencia
        };

        s3.getSignedUrl('getObject', params, (error, url) => {
            if (error) {
                reject(new Error('Erro ao buscar imagem! ' + error.message));
            } else {
                console.log('URL da imagem:', url);

                const downloadPath = path.join(__dirname, 'downloads', referencia);

                const dir = path.dirname(downloadPath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }

                downloadFile('bucketmi74', referencia, downloadPath)
                    .then(() => resolve({ url, localPath: downloadPath }))
                    .catch(downloadError => reject(downloadError));
            }
        });
    });
};

const downloadFile = (bucketName, keyName, downloadPath) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: keyName
        };

        s3.getObject(params, (err, data) => {
            if (err) {
                console.error('Erro ao baixar arquivo:', err);
                reject(err);
                return;
            }

            // Verifica o Content-Type e ajusta a extensão do arquivo
            const contentType = data.ContentType;
            let extension = '';

            if (contentType.includes('image/jpeg')) {
                extension = '.jpg';
            } else if (contentType.includes('image/png')) {
                extension = '.png';
            } else if (contentType.includes('image/gif')) {
                extension = '.gif';
            } else {
                console.error('Tipo de imagem não suportado:', contentType);
                reject('Tipo de imagem não suportado');
                return;
            }

            // Atualiza o caminho do download com a extensão correta
            const updatedDownloadPath = downloadPath.endsWith(extension) ? downloadPath : downloadPath + extension;

            const file = fs.createWriteStream(updatedDownloadPath);

            // Cria o fluxo de leitura a partir do S3 e faz o download
            file.write(data.Body, (err) => {
                if (err) {
                    console.error('Erro ao escrever arquivo:', err);
                    reject(err);
                } else {
                    console.log('Arquivo baixado com sucesso:', updatedDownloadPath);
                    resolve();
                }
            });
        });
    });
};

module.exports = { criarImagem, buscarImagem };