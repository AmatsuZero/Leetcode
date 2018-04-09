/*
* 一个星期有7天，按照下面格式输出。
输入：1 3 4 5 7
//全是升序输入，最大长度为7
输出：1，3-5，7
//三个以上（包括三个）的连续的用-输出
* */

module.exports = inputArray => {
    if (inputArray.length === 0) return ""
    let res=[];
    for(let i=0;i<inputArray.length;i++) {
        if(inputArray[i]+1 === inputArray[i+1]) {
            res.push(inputArray[i]);
            res.push(inputArray[i+1])
        }
    }
    res=[...new Set(res)];//去重
    if(res.length>=3) {
        const i = inputArray.indexOf(res[0]);
        const j = inputArray.indexOf(res[res.length-1]);
        let tmp = "";
        tmp = res[0] + "-" + res[res.length-1];
        inputArray.splice(i,j-i+1,tmp);//将原数组中的数字用转换过后的格式替换掉
    }
    return res.join(",");
}
