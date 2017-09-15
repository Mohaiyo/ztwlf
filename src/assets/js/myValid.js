export default{
    install(Vue){    
        let numValid = (rule, value, callback) => {
            // console.log(rule)
            if(/^\d+$/.test(value) == false){
                callback(new Error("请输入数字值"));
            }else{
                callback()
            }
        }

        const sumValid = (rule, value, callback) => {
            if(/^\d+(\.\d{0,2})?$/.test(value) == false){
                callback(new Error("请输入正确的格式，如：98827.32"));
            }else{
                callback()
            }
        }

        const phoneValid = (rule, value, callback) => {
            
            let reg = /^(((13[0-9]|14[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0|3|6|7|8])\d{8})|((\(\d{3,4}\)|\d{3,4}-?)?\d{7,8}(-\d{4})?))$/

            if(reg.test(String(value)) == false){
                callback(new Error("请输入正确的联系方式"));
            }else{
                callback();
            }
        }
        const emailValid = (rule, value, callback) => {
            let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if(reg.test(String(value)) == false){
                callback(new Error("请输入正确的邮箱格式"));
            }else{
                callback();
            }
        }

        const idValid = (rule, value, callback) => {
            if(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value) == false){
                callback(new Error("请输入正确的身份证号码"));
            }else{
                callback();
            }
        }

        // vue全局方法注入
        Vue.prototype._numValid = numValid
        Vue.prototype._sumValid = sumValid
        Vue.prototype._phoneValid = phoneValid
        Vue.prototype._emailValid = emailValid
        Vue.prototype._idValid = idValid

    }
}