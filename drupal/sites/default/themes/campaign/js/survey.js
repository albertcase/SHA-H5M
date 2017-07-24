
function QuestionSurvey(el, data){
    console.log(data);
    this.element = document.getElementById(el);
    this.questionList = data;
    this.submitData = {
        'campaign': data['campaign'],
        'data': {}
    };
    this.steps = 0;
    this.buttonText = [];
    this.setButtonText = function(val){
        this.element.querySelector('.submitForm').innerHTML = val;
    }
    this.homepage = function(){
        var homepageData = this.questionList['homepage'];     // 开始页面数据
        var homepageEl = document.getElementById('homepage');
        homepageEl.querySelector('.btn').innerHTML = homepageData['button_text'];
        homepageEl.querySelector('.con').innerHTML = `
            <div class="page-con__text">${homepageData['text']}</div>
        `;
    }
    this.success = function(){
        var successpageData = this.questionList['successpage'];     // 成功页面数据
        var successEl = document.getElementById('success');
        successEl.querySelector('.btn').innerHTML = successpageData['button_text'];
        successEl.querySelector('.btn').href = successpageData['button_link'];
        successEl.querySelector('.con').innerHTML = `
            <div class="page-con__text">${successpageData['text']}</div>
        `;
    }

    this.ajaxFun = function(method, url, data){
        var self = this;
        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                let data = xhr.responseText; // JSON.parse(xhr.responseText);
                _base.formErrorTips("提交成功！");
                
                console.log(data);

                self.success();   // 绘制成功页面数据

                _base.sectionChange('success');
            }
            
        }

        xhr.send(JSON.stringify(data));
    }
}

QuestionSurvey.prototype.init = function(){
    let ele = this.element,
        container = ele.querySelector('.question-list');
    if(typeof this.questionList == "object"){
        container.innerHTML = this.putQuestion();
        container.childNodes[0].className += ' active';
        
        this.homepage(); 
    }else{
        _base.formErrorTips('无效参数' + obj);
    }
}

QuestionSurvey.prototype.putQuestion = function(){
    let que = this.questionList['items'];
    var htmlData = [];
    var answerHtmlData = [], self = this;

    que.forEach(function(value, key, map) {
        var answer = value.options,
            answerHtmlData = [];

        // console.log(value, key);
        if(value.type === 'single' || value.type === 'multiple'){
            var inputType = (value.type == 'single' ? 'radio' : 'checkbox');
            answer.map((item) => {
                answerHtmlData.push(`<li><label><input type="${inputType}" name="${value.name}" value="${item}"> ${item} </label></li>`);
            })
        }else if(value.type === 'textarea'){
            answerHtmlData.push(`
                <li class="notype">
                    <p>${value.textarea_label}: </p>
                    <div class="disc">
                        <textarea maxlength="200" name="${value.name}"></textarea>
                    </div>
                </li>
            `);
        }else if(value.type === 'mix'){
            answer.map((item) => {
                answerHtmlData.push(`<li><label><input type="checkbox" name="${value.name}" value="${item}"> ${item} </label></li>`);
            })
            answerHtmlData.push(`
                <li class="notype">
                    <p>${value.textarea_label}: </p>
                    <div class="disc">
                        <textarea maxlength="200" name="${value.name}"></textarea>
                    </div>
                </li>
            `);
        }else{

        }

        

        

        // console.log(value, key);
        
        // answer.forEach(function(a, b, c){
        //     if(a == 'other'){
        //         answerHtmlData.push(`<li class="other">其它：<label><input type="text" name="${key}"></label></li>`);
        //     }else{
        //         answerHtmlData.push(`<li><label><input type="${value.type}" name="${key}" value="${a}"> ${a} </label></li>`);
        //     }
        // })

        
        htmlData.push(
            `<div class="q" data-type="${value.type}" data-name="${value.name}" data-id="${value.item_id}">
                <div class="q-head">
                ${value.title}
                </div>
                <ol class="q-con" style="list-style-type:${value.list_style_type}">
                ${answerHtmlData.join('')}
                </ol>
            </div>`
        )

        self.buttonText.push(value['button_text']);
    });

    // console.log(self.buttonText);
    self.setButtonText(self.buttonText[0]);

    return htmlData.join('');
}

QuestionSurvey.prototype.formCheck = function(){
    var ele = this.element,
        container = ele.querySelector('.question-list'),
        eleActive = ele.querySelector('.q.active'),
        dataId = eleActive.getAttribute('data-id'),
        dataType = eleActive.getAttribute('data-type'),
        dataName = eleActive.getAttribute('data-name'),
        submitData = this.submitData,
        inputCheckedVal = [],
        self = this;

        eleActive.querySelectorAll('input').forEach(function(z, x, c){
            if(z.checked || z.type == "text" && z.value != ""){
                inputCheckedVal.push(x+1); 
            }
        })

        if(dataType === 'mix' || dataType === 'textarea'){
            var textarea = eleActive.querySelector('textarea');
            if(textarea.value != ""){
                inputCheckedVal.push(textarea.value); 
            };
        }

        if(inputCheckedVal.length < 1){
            _base.formErrorTips('必选项');
        }else{

            submitData['data'][dataName] = inputCheckedVal;
            // submitData.push(`${inputCheckedVal}`);

            if((self.steps/(container.childNodes.length-1)) >= 1){

                self.ajaxFun('POST', '/ajax/survey/post', submitData);  

            }else{
                container.childNodes[self.steps].className = 'q';
                container.childNodes[self.steps + 1].className += ' active';
                self.steps += 1;  

                if(self.steps % (container.childNodes.length-1) == 0){
                    self.setButtonText(self.buttonText.pop());
                }else{
                    self.setButtonText(self.buttonText[self.steps % (container.childNodes.length-1)]);
                }
            }

        }

}










