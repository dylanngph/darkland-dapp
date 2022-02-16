export default function migrateAttributeHero(attr) {
    const str = attr
    // let indexId = 3;
    // let indexOrigin=5;
    // let indexOrigin=7;
    // let indexItem1=9;
    // let indexItem2=11;
    // let indexItem3=13;

    // let indexRune1=15;
    // let indexRune2=17;
    // let indexRune3=19;
    const summon = str.substring(19,21);
    const indexSummonTime = 21;
    const hId = parseInt(str.substring(0,3))-100;
    const heroOrigin = parseInt(str.substring(3,5))-10;
    const heroClass = parseInt(str.substring(5,7))-10;
    const item1 = parseInt(str.substring(7,9))-10;
    const item2 = parseInt(str.substring(9,11))-10;
    const item3 = parseInt(str.substring(11,13))-10;
    const rune1 = parseInt(str.substring(13,15))-10;
    const rune2 = parseInt(str.substring(15,17))-10;
    const rune3 = parseInt(str.substring(17,19))-10;
    const tag = parseInt(str.substring(19,21))-10;
    const targetType = parseInt(str.substring(21));

    const tagList=[
        'Origin',
        'Binance',
        'KickStarter'
    ]

    const items = [item1,item2,item3];
    let gen=0;
    for(let i=0;i<3;++i){
        if (items[i] > 8)
            gen++;
    }
    const dataAttr = {
        "_id": str,
        "heroId": hId,
        "heroOrigin": heroOrigin,
        "heroClass": heroClass,
        "targetType": targetType,
        "items":items,
        "runes":[rune1, rune2, rune3],
        "author": tagList[tag],
        "gen": gen
    }

    return dataAttr
}