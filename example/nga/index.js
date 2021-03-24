const aecrawl = require('../../');

/**
 * 示例：抓取NGA游戏列表
 */
(async ()=>{

  const tasks = require('./tasks');
  console.time('task-duration');

  // 抓取
  var threads = [];
  for( let t of tasks ){
    const result = await aecrawl( t, true );
    threads = threads.concat( result );
  }
  console.log(`已抓取${threads.length}条`);
  console.log( threads );

  /**
   * do something: 数据处理及保存
   */
  
  console.timeEnd('task-duration');
  process.exit(0);

})();