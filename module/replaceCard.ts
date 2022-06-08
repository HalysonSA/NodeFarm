
const replaceCard = (event:any, product:any ) => {
    
    let out = event.replace(/{%PRODUCTNAME%}/g, product.productName)
    out = out.replace(/{%IMAGE%}/g, product.image)
    out = out.replace(/{%DESCRIPTION%}/g, product.description)
    out = out.replace(/{%QUANTITY%}/g, product.quantity)
    out = out.replace(/{%PRICE%}/g, product.price)
    
    out = out.replace(/{%NUTRIENTS%}/g, product.nutrients)
    out = out.replace(/{%ID%}/g, product.id)
    out = out.replace(/{%FROM%}/g, product.from)

    if(!product.organic) out = out.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    return out;
}
export default replaceCard;