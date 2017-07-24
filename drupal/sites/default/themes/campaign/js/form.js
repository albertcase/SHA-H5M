function form(el, data){

    var setting = {
        'el': document.getElementById(el),
        'data': data,
        'submitData': {}
    }

    this.init = function(){
        setting['el'].querySelector('.form-group').innerHTML = this.formHTML()
    }
    this.isPhoneNum = function(v){
        //return /^0|^((\+?86 )|(\(\+86 \)))?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/.test(v);
        return /^1([0-9]){10}$/.test(v);
    }
    this.emailCheck = function(v){
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v);
    }
    this.ajaxFun = function(method, url, data){
        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                let data = xhr.responseText; // JSON.parse(xhr.responseText);
                _base.sectionChange('success');
                console.log(data);
            }
            
        }

        xhr.send(JSON.stringify(data));
    }
    this.check = function(){ // form
        var formGroup = setting['el'].querySelectorAll(".form-node"),
            errorTips = '不能为空！',
            self = this;

        setting['submitData']['campaign'] = setting['data']['campaign'];

        for(let i = 0; i < formGroup.length; i++){
            let currentInputValue = formGroup[i].getElementsByTagName('input')[0].value,
                currentInputName = formGroup[i].getElementsByTagName('input')[0].name,
                currentInputType = formGroup[i].getElementsByTagName('input')[0].type,
                currentErrorText = formGroup[i].getElementsByTagName('input')[0].getAttribute('data-error'),
                validate = formGroup[i].getAttribute('data-validate');

            // 备用错误检测
            if(currentInputValue == '' && validate == 1){
                _base.formErrorTips(currentErrorText + errorTips);
                break
            }else if(currentInputType === 'tel' && !self.isPhoneNum(currentInputValue) && validate == 1){
                _base.formErrorTips(currentErrorText + '输入有误！');
                break
            }else{
                setting['submitData'][currentInputName] = currentInputValue;
                if(Number(i + 1) % formGroup.length === 0){
                    self.ajaxFun('POST', '/ajax/form/post', setting['submitData']);
                }
            }
            

            //setting['submitData'][currentInputName] = currentInputValue;

        }

        

        // Array.from(formGroup).map(function(v, k){  
        //     let currentInputValue = v.getElementsByTagName('input')[0].value,
        //         currentInputName = v.getElementsByTagName('input')[0].name;

        //     if(!currentInputValue && currentInputValue === ''){
        //         v.className += ' error';
        //         //_base.formErrorTips(`姓名不能为空！`);
        //     }else{
        //         v.className = 'form-node';
        //     }
            
            
        // })

        // console.log(setting['submitData']);



        // return JSON.parse('{' + $.map(formGroup, function(v, k){
        //     var curInput = $(v).find('input');
        //     curInput.length > 0 ? curInput = $(v).find('input') : curInput = $(v).find('select');
        //     var _inputType = curInput.attr('type');
        //     var _inputName = curInput.attr('name');

            
        //     return '"' + _inputName + '": "' + $.map(curInput, function(o, p){ 
        //         if(($(o).attr('type') == 'checkbox' || $(o).attr('type') == 'radio') && !$(o).is(':checked')){
        //         }else{
        //             return $(o).val();
        //         } 
        //     }).join(',') + '"' + (k == parseInt(formGroup.length - 1, 10) ? '' : ',');

        // }).join('') + '}');
    }
    this._typeIf = function(a){  // tag, type
        //if(a.tag == 'input'){

            switch(a.type){
            case 'checkbox':
              var checkboxLen = a.option.split(',');
              return '<p>'+ a.lable +': </p>' + checkboxLen.map(function(v, k){
                    return '<span class="checkbox"><label><input type='+ a.type +' value='+ v +' name='+ k +'>'+ v +'</label></span>'
              }).join('');

              break;
            case 'radio': 
              var radioLen = a.option.split(',');
              return '<p>'+ a.lable +': </p>' + radioLen.map(function(v, k){
                    return '<span class="radio"><label><input type='+ a.type +' value='+ v +' name='+ k +'>'+ v +'</label></span>'
              }).join('');
              break;
            default:
              return '<span>'+ a.lable +': </span><input type='+ a.type +' data-error='+ a.lable +' name='+ a.name +' '+ (a.placeholder ? 'placeholder="'+ a.placeholder +'"' : '') +' '+ (a.type === 'tel' ? 'maxlength="11"' : '') +' >';
              break;
            }


        // }else if(a.tag == 'select'){
        //     var selectOptionLen = a.option.split(',');

        //     var selectHTML = selectOptionLen.map(function(v, k){
        //         return '<option value="'+ v +'">'+ v +'</option>'
        //     }).join('');

        //     return '<span>'+ a.label +': </span><select name="'+ a.name +'">'+ selectHTML +'</select>'
        // }else{
        //     console.log('none');
        // }
    },
    this.success = function(obj){
        var successEl = document.getElementById('success');
        successEl.querySelector('.moreBtn').innerHTML = obj['button_text'];
        successEl.querySelector('.moreBtn').href = obj['button_link'];
        successEl.querySelector('.success-con').innerHTML = `
            <div class="success-con__text">${obj['text']}</div>
        `;
    },
    this.formHTML = function(){
        var self = this,
            objForm = setting['data'].form,                    // form 页面数据
            successpageData = setting['data'].successpage,     // 成功页面数据
            submitFormText = objForm['button_text'];           // 表单提交按钮text  


        this.success(successpageData);                         // 绘制成功页面数据

        setting['el'].querySelector('.submitForm').innerHTML = submitFormText;

        return $.map(objForm['body'], function(v, k){
            return '<div class="form-node" data-validate='+v.validate+'>' + self._typeIf(v) + '</div>';
        }).join('');
    }

}


