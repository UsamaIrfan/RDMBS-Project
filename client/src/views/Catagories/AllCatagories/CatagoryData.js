const catagoryData = [
    { id: 0, name: 'Watches', registered: '2018/01/01', products: 66 },
    { id: 1, name: 'Perfumes', registered: '2018/01/01', products: 21 },
    { id: 2, name: 'Shirts', registered: '2018/02/01', products: 25 },
    { id: 3, name: 'Pants', registered: '2018/02/01', products: 5 },
    { id: 4, name: "Cosmetics", registered: '2018/03/01', products: 55 },
]

const userData = [
    { id: 5, name: 'Friderik Dávid', registered: '2018/01/21', role: 'Staff', status: 'Active' },
    { id: 6, name: 'Yiorgos Avraamu', registered: '2018/01/01', role: 'Member', status: 'Active' },
    { id: 7, name: 'Avram Tarasios', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
    { id: 8, name: 'Quintin Ed', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
    { id: 9, name: 'Enéas Kwadwo', registered: '2018/03/01', role: 'Member', status: 'Pending' },
    { id: 10, name: 'Agapetus Tadeáš', registered: '2018/01/21', role: 'Staff', status: 'Active' },
    { id: 11, name: 'Carwyn Fachtna', registered: '2018/01/01', role: 'Member', status: 'Active' },
    { id: 12, name: 'Nehemiah Tatius', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
    { id: 13, name: 'Ebbe Gemariah', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
    { id: 14, name: 'Eustorgios Amulius', registered: '2018/03/01', role: 'Member', status: 'Pending' },
    { id: 15, name: 'Leopold Gáspár', registered: '2018/01/21', role: 'Staff', status: 'Active' },
    { id: 16, name: 'Pompeius René', registered: '2018/01/01', role: 'Member', status: 'Active' },
    { id: 17, name: 'Paĉjo Jadon', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
    { id: 18, name: 'Micheal Mercurius', registered: '2018/02/01', role: 'Admin', status: 'Inactive' },
    { id: 19, name: 'Ganesha Dubhghall', registered: '2018/03/01', role: 'Member', status: 'Pending' },
    { id: 20, name: 'Hiroto Šimun', registered: '2018/01/21', role: 'Staff', status: 'Active' },
    { id: 21, name: 'Vishnu Serghei', registered: '2018/01/01', role: 'Member', status: 'Active' },
    { id: 22, name: 'Zbyněk Phoibos', registered: '2018/02/01', role: 'Staff', status: 'Banned' },
    { id: 23, name: 'Aulus Agmundr', registered: '2018/01/01', role: 'Member', status: 'Pending' },
    { id: 42, name: 'Ford Prefect', registered: '2001/05/25', role: 'Alien', status: 'Don\'t panic!' }
]

const products = {
    arrayOfProducts: [
        {
            imgUrl: "https://guesseu.scene7.com/is/image/GuessEU/M63H24W7JF0-L302-ALTGHOST?wid=1500&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
            name: "CHECK PRINT SHIRT",
            price: 110
        },
        {
            imgUrl: "https://guesseu.scene7.com/is/image/GuessEU/FLGLO4FAL12-BEIBR?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
            name: "GLORIA HIGH LOGO SNEAKER",
            price: 91
        },
        {
            imgUrl: "https://guesseu.scene7.com/is/image/GuessEU/HWVG6216060-TAN?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
            name: "CATE RIGID BAG",
            price: 94.5
        },
        {
            imgUrl: "http://guesseu.scene7.com/is/image/GuessEU/WC0001FMSWC-G5?wid=520&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
            name: "GUESS CONNECT WATCH",
            price: 438.9
        },
        {
            imgUrl: "https://guesseu.scene7.com/is/image/GuessEU/AW6308VIS03-SAP?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
            name: "'70s RETRO GLAM KEFIAH",
            price: 20
        }
    ]
}

export default catagoryData;