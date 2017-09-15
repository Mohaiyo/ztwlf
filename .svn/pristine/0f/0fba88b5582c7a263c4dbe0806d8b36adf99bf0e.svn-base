import Vue from 'vue'

// 参数筛选
let params = JSON.parse(localStorage.getItem('params'))

const paraFilter = (paraValue, paraCode) => {
	
	params = params || JSON.parse(localStorage.getItem('params'))

	if(!paraValue || !paraCode){
		return ''
	}
	let result  
	for(let data of params){
		if (data.paraValue == paraValue && data.paraCode == paraCode) {
		    result = data.paraDesc
		}
	}
	return result
}
// n等于0的时候，不留小数位
const moneyFormat = (s, n) => {
    if(!s || Number(s) < 0) return
    n = n >= 0 && n <= 20 ? n : 2;
    let f = s < 0 ? "-" : ""; //判断是否为负数
    s = parseFloat((Math.abs(s) + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";//取绝对值处理, 更改这里n数也可确定要保留的小数位
    s = s.replace(/\,/g, "");
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    let t = "";
    for(let i = 0; i < l.length; i++ ) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var res;
    if(n == 0){
        res = f + t.split("").reverse().join("");
    }else{
        res = f + t.split("").reverse().join("") + "." + (r ? r.slice(0,n) : '');
    }
    return res
}

//四位分割
const spaceFilter = (t) => {
    if(!t || t.length < 4) return t
    
    let tmp = '',
        n = t.length/4
    for(let i=0; i<n; i++){
        tmp  += t.substr(4*i,4) + ' '
    }
    return tmp.trim()
}
//保留10个字符
const postFilter = (t) => {
    if(!t || t.length < 10) return t
    
    let tmp = ''
    tmp = t.substring(0,10)
    return tmp
}
//格式化日期yyyy-MM-dd HH:mm:ss
const dateFilter = (value, format) => {
	if (!value) return ''
	let timeStr
	if(value.length == 8){
		value = value + '000000'
		timeStr = value.replace(/(\d{0,4})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/, format);
	}else{
		timeStr = value.replace(/(\d{0,4})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/, format);
	}
	return timeStr
}

const dateFormat = (date) => {
        if (date == null || date == "") {
            return "";
        }
        var strdate = "";
        if (date.length == 14) {
            strdate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2)
                + " " + date.substr(8, 2) + ":" + date.substr(10, 2) + ":" + date.substr(12, 2);
        }
        if (date.length == 8) {
            strdate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
        }
        if (date.length == 6) {
            strdate = date.substr(0, 2) + ":" + date.substr(2, 2) + ":" + date.substr(4, 2);
        }
        return strdate;
    }
Vue.filter('paraFilter', paraFilter)
Vue.filter('spaceFilter', spaceFilter)
Vue.filter('dateFilter', dateFilter)
Vue.filter('DateFormat', dateFormat)
Vue.filter('moneyFormat', moneyFormat)
Vue.filter('postFilter', postFilter)