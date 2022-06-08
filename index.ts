import fs from 'fs';
import http from 'http';
import replaceCard from './module/replaceCard';
import url from 'url';
//SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj= JSON.parse(data)


const tproduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')
const toverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const tcard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')

type typeUrl={
    url:string,
}

const server = http.createServer((req:any, res:any) => {
    
    const {query, pathname} = url.parse(req.url, true)

    //home
    if (pathname === '/'){
        res.writeHead(200, {
            'Content-type': 'text/html'
          });
        
        const cardsHtml = 
        dataObj.map((event:any) => replaceCard(tcard, event)).join('\n');

        const out = toverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
       
        res.end(out)
    }
    //carrinho
    else if(pathname === '/product'){
        res.writeHead(200, {"Content-type": "text/html"});
        const product = dataObj[query.id];
        const out = replaceCard(tproduct, product);
        res.end(out)
        
    }
    //api
    else if(pathname === '/api'){
        
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data);
    }
    //error
    else{
        res.writeHead(404,{
            'content-type': 'text/html',

        })
        res.end('<h1>not found 404</h1>');
    }
})
server.listen(3333, () => {
    console.log('Server running at http://localhost:3333/');
})























/*
//blocking, synchronous
const a = fs.readFileSync('./txt/input.txt', 'utf-8');
fs.writeFileSync('./txt/output.txt', a);

//unblocking, asynchronous 
fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        fs.writeFile('./txt/output.txt', data, err => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('file written');
            }
        });
    }
});
console.log('mais rapido')*/