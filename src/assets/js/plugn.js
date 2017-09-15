import { MessageBox } from 'mint-ui'
export default{
    install(Vue){
        // 公共ajax查询,post方法
        const ajaxSubmit = (actionDo, actionUrl,params, callback) => {
            let base_url = 'method=';
            let url = '/ztwlf/' + actionDo + '?' + base_url + actionUrl;
            Vue.http.post(url, params).then((res) => {
               // let resData = res.data
                let resData
                 resData = typeof res.data == 'string' ? JSON.parse(res.data) : res.data
                if(errCheck(resData)){// 返回结果校验
                    callback(resData)
                }
            }, (res) => {
                MessageBox.alert( res.status, '错误状态码提示', {// 500错误等
                    confirmButtonText: '确定'
                })
            })  
        }


        const ajaxSubmitGet = (actionDo, actionUrl,params, callback) => {
            let newParam = ''
            let base_url = 'method=';
            for(let name in params){//把传入的params对象转变成 xx.do?pageNo=0&pageSize=10这种形式
                newParam += name + '=' + params[name] + '&'
            }
            newParam = newParam ? newParam.slice(0,newParam.lastIndexOf('&')) : ''//去掉newParam的最后一个"$"

            let url = ''
            if( params == '' || isEmptyObject(params) ){
                url = 'ztwlf/' + actionDo + '?' + base_url + actionUrl + '?timestamp=' + new Date().getTime()
            }else {
                url = 'ztwlf/' + actionDo + '?' + base_url + actionUrl + '?timestamp=' + new Date().getTime() + '&' + newParam
            }

            Vue.http.get(url).then((res) => {
                //let resData = res.data
                let resData
                  resData = typeof res.data == 'string' ? JSON.parse(res.data) : res.data
                if(errCheck(resData)){// 返回结果校验
                    callback(resData)
                }
            }, (res) => {
                MessageBox.alert( res.status, '错误状态码提示', {// 500错误等
                    confirmButtonText: '确定'
                }) 
            })

            //判断一个对象是否为空
            function isEmptyObject(e) {  
                let t;  
                for (t in e)  
                    return !1;  
                return !0  
            }  
        } 


        // 返回结果校验
        const errCheck = (o) => {
            if (!o) {
                MessageBox.alert( '系统繁忙，请稍后再试！', '提示', {
                    confirmButtonText: '确定'
                })
                return false
            } else if (o && (typeof o == 'string') ) {
                o = JSON.parse(o)
            }
            // 错误检查
            if (o.errorCode != '0000') {
                if (o.errorCode == '9000') {
                    MessageBox.alert( o.errorMsg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            let logName = localStorage.getItem('logName')
                            localStorage.clear()
                            localStorage.setItem('logName', logName)
                            window.location.href = '/' //返回登陆页 
                        }
                    })
                    return false
                } else {
                    MessageBox.alert( o.errorMsg || '没有返回errorMsg', '提示', {
                        confirmButtonText: '确定'
                    })
                    return false
                }
            } else {
                return true
            }
        }
        

        //登陆的时候会在login.vue中执行this._getParams()
        const getParams = () => {
            let param = { paraType: "",paraStatus:"1",paraNo: "",paraCode: "",pageSize: "",pageNo: "",paraName: ""} 
            ajaxSubmitGet( "queryParamList.do", param, (data) => {
                if (data.errorCode == "0000") {
                    localStorage.setItem('params',JSON.stringify(data.paraList))
                }
            })
        }


        // 获取指定参数数组
        const getParaArray = (paramNo, paraType) => {
            let result = []
            for(let v of JSON.parse(localStorage.getItem('params'))){
                if (v.paraCode == paramNo) {
                    if((paraType && v.paraType == paraType) || !paraType) {
                        result.push(v)
                    }
                }
            }
            return result
        }


        //参数筛选
        const getParaValue = (paramNo, paraCode) => {
            let result   
            for(let data of JSON.parse(localStorage.getItem('params'))){
                if (data.paraNo == paramNo && data.paraCode == paraCode) {
                    result = data.paraValue
                }
            }
            return result
        }

        //获取参数名称paradesc
        const getParaDesc = (paraValue, paraCode) => {
            let result   
            for(let data of JSON.parse(localStorage.getItem('params'))){
                if (data.paraValue == paraValue && data.paraCode == paraCode) {
                    result = data.paraDesc
                }
            }
            return result
        }


        //格式化时间,可以转以下四种情况：
        // a. 20170101091030 → 2017-01-01 09:10:30
        // b. 20170101       → 2017-01-01
        // c. 091030         → 09:10:30
        // d. new Date       → 2017-01-01(举个例子，事实上不是2017-01-01,是相应的年月日，这个用来转换查询条件的开始时间和结束时间)
        // t:判断是否需要获取时间
        const dateFormat = (date,t) => {
            if (!date) {
                return ''
            }
            let strDate = '' // 必须写 = ''，不能直接写let strDate,因为default里面要用到字符串拼接
            switch ( (date + '').length ) {
                case 14:
                    strDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2)
                    + " " + date.substr(8, 2) + ":" + date.substr(10, 2) + ":" + date.substr(12, 2)
                    break

                case 8:
                    strDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2)
                    break

                case 6:
                    strDate = date.substr(0, 2) + ":" + date.substr(2, 2) + ":" + date.substr(4, 2)
                    break

                case 42: // 查询条件的开始时间和结束时间的情况
                    let objDate = {
                        'Y': date.getFullYear(),
                        'M': (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
                        'd': date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
                    }
                    for (let k in objDate) {
                        strDate += objDate[k]
                    }
                    if(t) {
                        let objTime = {
                            "h+" : date.getHours() >= 10 ? date.getHours() : '0' + date.getHours(),                   //小时 
                            "m+" : date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes(),                //分 
                            "s+" : date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds() 
                        }
                        for (let k in objTime) {
                            strDate += objTime[k]
                        }
                    }
                    break

                default: // 如果后台写的数据不是正常的，就直接返回
                    strDate = date + ''


            }
            return strDate
        }


        //数字自动转换人民币金额
        const nst = (t) => {//blur时
            t = t + ''
            if(!t) return '' // 这里有疑问
            var ms = t.replace(/[^\d\.]/g,"").replace(/(\.\d{2}).+$/,"$1").replace(/^0+([1-9])/,"$1").replace(/^0+$/,"0");
            var txt = ms.split(".");
            while(/\d{4}(,|$)/.test(txt[0]))
                txt[0] = txt[0].replace(/(\d)(\d{3}(,|$))/,"$1,$2");
            return txt[0]+(txt.length>1?"."+txt[1]:".00");
        }


        const rmoney = (s) => {//focus时
            s = s + '';
            if(s != null && s !=""){
                return parseFloat(s.replace(/[^\d\.-]/g, ""));
            }else return ""
        }


        // 基于今天获得几天前的日期，比如今天是2017年5月22日，参数为1时，会返回20170521
        const daysAgo = (d) => {
            let millisecond = new Date().getTime() - d * 24 * 60 * 60 * 1000
            let setMilliSec = new Date()
            setMilliSec.setTime(millisecond)
            let year = setMilliSec.getFullYear()
            let month = setMilliSec.getMonth() + 1
            month = month >= 10 ? month : '0' + month
            let day = setMilliSec.getDate()
            day = day >= 10 ? day : '0' + day
            return year + '' + month + day
        }


        const daysAgoFormat = (d) => {
            let millisecond = new Date().getTime() - d * 24 * 60 * 60 * 1000
            let setMilliSec = new Date()
            setMilliSec.setTime(millisecond)
            let year = setMilliSec.getFullYear()
            let month = setMilliSec.getMonth() + 1
            let day = setMilliSec.getDate()
            return year + '年' + month + '月' + day + '日'
        }


        // 将银行账号每四位加一个空格
        const accountFormat = (accNum) => {
            if(!accNum || accNum == "null"){
                return ""
            }else{
                return accNum.substr(0,4) + " " + accNum.substr(4,4) + " " + accNum.substr(8,4) + " " + accNum.substr(12,4) + " " + accNum.substr(16,4) + " " + accNum.substr(20,4);
            }
        }





        // vue全局方法注入
        Vue.prototype._ajaxSubmit    = ajaxSubmit
        Vue.prototype._ajaxSubmitGet = ajaxSubmitGet
        Vue.prototype._getParams     = getParams
        Vue.prototype._errCheck      = errCheck
        Vue.prototype._getParaArray  = getParaArray
        Vue.prototype._getParaValue  = getParaValue
        Vue.prototype._getParaDesc   = getParaDesc
        Vue.prototype._dateFormat    = dateFormat
        Vue.prototype._nst           = nst
        Vue.prototype._rmoney        = rmoney
        Vue.prototype._daysAgo       = daysAgo
        Vue.prototype._daysAgoFormat = daysAgoFormat
        Vue.prototype._accountFormat = accountFormat
    }
}