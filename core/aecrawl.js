const Crawler = require('crawler')
const temme = require('temme').default

/**
 * 抓取并提取数据
 * 封装Crawler：支持queue，支持tm解析
 * @param {array} queue = [ url, url .. ]
 * @param {string} tm 数据提取规则
 * @param {function} format data => data
 * @param {bool} concat 是否concat队列的结果（需要tm处理返回array）
 * @param .. 见Crawler
 */
module.exports = async function aecrawl({ queue = [], tm, format = null, concat = false, maxConnections = 5, rateLimit = 1000 }, verbose = false ){

  var result = []

  const c = new Crawler({
      maxConnections, //最大同时连接数
      rateLimit,   //每项任务间隔1000ms
      callback : async function (error, res, done) {
          if(error) console.log(error);
          else{
              console.log( res.request.uri.href , res.statusCode )
              var data = temme( res.body, tm )
              console.log( 'temme extract => '+ Object.keys(data).length )
              
              format && ( data = format(data) )
              concat ? ( result = result.concat(data) ) : result.push( data )
          }
          done()
      }
  });

  queue.forEach( q => c.queue(q) )

  return new Promise( ( resolve, reject ) => {
      c.on('drain',function(){
          resolve( result )
      });
  })
}