const posts = [
    {
        author: 'francisquinha',
        text: 'ué, ué, ué!'
    },
    {
        author: 'ramonzito',
        text: 'que que foi, que que foi, que que há?'
    },
    {
        author: 'el_chavo',
        text: 'tá bom mas não se irrite'
    },
    {
        author: 'sanchezrick',
        text: 'PICKLE RICK!!!'
    },
    {
        author: 'michael_scott',
        text: 'that\'s what she said'
    },
    {
        author: 'el_chavo',
        text: 'foi sem querer querendo'
    }
];
const getPostsPerAuthor = (posts, author) => {
    return posts.filter((item) => (item.author === author));
};
console.log(getPostsPerAuthor(posts, 'el_chavo'));
console.log(getPostsPerAuthor(posts, 'barney_stinson'));
console.log(getPostsPerAuthor(posts, ''));
//# sourceMappingURL=ex4.js.map