module.exports = [
    {
        name : 'NGS.CN',
        concat : true,
        queue : [
            'http://game.nga.cn/all?page=1',
            'http://game.nga.cn/all?page=2',
        ],
        tm :`
          div.blockItem@{
            a.pic[href=$link][style=$image];
            h5 a{ $title };
            div.time{ $release_time };
            div.num{ $score };
          };
        `,
        format : items => items.map( i => {
            i.image = i.image.match(/url\((.+)\)/)[1];
            return i
        }).filter( i => i )
    },
]