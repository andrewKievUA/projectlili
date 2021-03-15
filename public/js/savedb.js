function cl(input){console.log(input);}



inj = ''
 for (var i = 30; i <= 120; i += 5) {  
    inj += "<button id="+'nacenka'+i+" onclick='moveInt("+i+")' class='buttonss' value='"+i+"'>"+i+"</button>";
    }

 injection.outerHTML =`<div id='marginLeft50px'>${inj}</div>`; //кнопки маленькие с цифрами наверху

function moveInt(input){  //вывод на страницу строки с надписями ай ди шника и цена в одну строку
    bfbf=document.querySelector('#priceSupply').value    
    document.querySelector('#priceSell').value =  +(bfbf) + input 
    bfbf3=document.querySelector('#priceSell').value 

bfbf2=document.querySelector('#id').value 
injection2.outerHTML = "<output id='injection2' class='marginLeft50px'> Код#_"+bfbf2+"_Цена_"+bfbf3+" </output>";
}

injectionButton.outerHTML =`
<div class="brd" id="showMeDescription">
Введите ID
<input type="number" id="showMeDescriptionValueHtml" value="" name="showMeDescriptionValueHtml" autocomplete="off" onchange="showMeDescription()" > 

 
<div/>


 `//<button  class="submit2" id="showMeDescriptionButtonHtml" onclick="showMeDescription()">Найти в базе</button>

function showMeDescription (){
     
    fetch ('/showMeDescription', {
        method: 'POST',
        body: JSON.stringify({id:document.querySelector('#showMeDescriptionValueHtml').value}),
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        
        let show2tabsOr1tab = false
        if (data[0][0].id > 1  ){
            if (data[1][0].id > 1  ){
                 
                 show2tabsOr1tab=true
            }    
        } 
    


        if (show2tabsOr1tab==0){
        showMeDescriptionInjection.outerHTML = `
            <div class="brd" id ="showMeDescriptionInjection">
                <output class="inline"> id ${data[0][0].id}  </output>  <br>
                <output class="inline">Курьер  ${data[0][0].priceTransfer}  </output>
                <output class="inline">Цена закупки ${data[0][0].priceSupply}  </output>
                <output class="inline">Цена продажи ${data[0][0].priceSell}  </output>
                <br>
                <a target="_blank"  class='inline' href=${data[0][0].url1}>${data[0][0].url1}</a> 
                <br>      
                <a target="_blank"  class='inline' href=${data[0][0].url2}>${data[0][0].url2}</a>  
                <br>
                <output class="inline">Комментарий ${data[0][0].comment}  </output>
            </div> 
                    ` 
        }
        if (show2tabsOr1tab){
            showMeDescriptionInjection.outerHTML = `

            <div id ="showMeDescriptionInjection">
                <div class="brd" >
                    <output class="inline"> id ${data[0][0].id}  </output>  <br>
                    <output class="inline">Курьер  ${data[0][0].priceTransfer}  </output>
                    <output class="inline">Цена закупки ${data[0][0].priceSupply}  </output>
                    <output class="inline">Цена продажи ${data[0][0].priceSell}  </output>
                    <br>
                    <a target="_blank"  class='inline' href=${data[0][0].url1}>${data[0][0].url1}</a> 
                    <br>      
                    <a target="_blank"  class='inline' href=${data[0][0].url2}>${data[0][0].url2}</a>  
                    <br>
                    <output class="inline">Комментарий ${data[0][0].comment}  </output>
                </div>

                <div class="brd" >
                <output class="inline"> id ${data[1][0].id}  </output>  
                <output class="inline">ФИО  ${data[1][0].firstName}  </output><br>
                <output class="inline">Телефон ${data[1][0].contact_message}  </output> <br>
                <a target="_blank"  class='inline' href=${data[1][0].url1}>${data[1][0].url1}</a> 
                <br>      
                <a target="_blank"  class='inline' href=${data[1][0].url2}>${data[1][0].url2}</a>  
                <br>
                <output class="inline">Комментарий ${data[1][0].comment}  </output>
                <output class="inline">Уникальный урл ${data[1][0].unigURL}  </output> <br>
            </div>
            </div> 
                        ` 
            }

    })
}



document.querySelector('#submitForSavingInGoods').onsubmit = function (event) {
    event.preventDefault()
    let id = document.querySelector('#id').value.trim()
    let priceTransfer = document.querySelector('#priceTransfer').value.trim()
    let priceSupply = document.querySelector('#priceSupply').value.trim()
    let priceSell = document.querySelector('#priceSell').value.trim()
    let url1 = document.querySelector('#url1').value.trim()
    let url2 = document.querySelector('#url2').value.trim()
    let comment = document.querySelector('#comment').value.trim()
    let direction = false
    if (url1==url2){
            direction=true
            Swal.fire({
                icon: 'error',
                title: 'Ссылка1=Ссылка2',
                showConfirmButton: false,
                timer: 1000
            })
    }
    if (url1==''){
        direction=true
        Swal.fire({
            icon: 'error',
            title: 'Ссылка1=пуста',
            showConfirmButton: false,
            timer: 1000
        })
    }   

    if (url2==''){
        direction=true
        Swal.fire({
            icon: 'error',
            title: 'Ссылка2=пуста',
            showConfirmButton: false,
            timer: 1000
        })
    }   

cl (direction)
    if(direction==false){
        fetch ('/saveGoodsByFetch', {
            method: 'POST',
            body: JSON.stringify({                          
                id : document.querySelector('#id').value.trim(),
                priceTransfer : document.querySelector('#priceTransfer').value.trim(),
                priceSupply : document.querySelector('#priceSupply').value.trim(),
                priceSell : document.querySelector('#priceSell').value.trim(),
                url1 : document.querySelector('#url1').value.trim(),
                url2 : document.querySelector('#url2').value.trim(),
                comment : document.querySelector('#comment').value.trim()
            }),
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
           
            return response.json()
            
        })
        .then(function(data) { 
            
     
        showIdLastByFetch()
        })         
    }
}

function showIdLastByFetch(){
    fetch ('/showMeLasrGoodsIdByFetch', {
        method: 'POST',
        body: '',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        cl(data[0]['MAX(ID)']+1)
        document.querySelector('#id').value=data[0]['MAX(ID)']+1
        document.querySelector('#priceTransfer').value=0
        document.querySelector('#priceSupply').value=''
        document.querySelector('#priceSell').value=''
        document.querySelector('#url1').value=''
        document.querySelector('#url2').value=''
        document.querySelector('#comment').value=''

        showMeLastGoodsNode()
    })
}



function showMeLastGoodsNode(inputText){
    fetch ('/showMeLastGoodsNode', {
        method: 'POST',
        body: '',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        let text =''
        if (inputText) {text=''+inputText}    
        showMelastDownloaded.outerHTML = `
          <div id ="showMelastDownloaded">
              <div class="brd2" >
                  <span>Последняя загрузка </span>
                  <output > id ${data[0].id}  </output>  <br>
                  <output >Курьер  ${data[0].priceTransfer}  </output>
                  <output >Цена закупки ${data[0].priceSupply}  </output>
                  <output >Цена продажи ${data[0].priceSell}  </output>
                  <br>
                  <a target="_blank"   href=${data[0].url1}>${data[0].url1}</a> 
                  <br>      
                  <a target="_blank"   href=${data[0].url2}>${data[0].url2}</a>  
                  <br>
                  <output >Комментарий ${data[0].comment}  </output>
              </div>
              `
            Swal.fire({ 
                position: 'top-end',    
                icon: 'success',
                title: `GOOD${text}`,
                showConfirmButton: false,
                timer: 800
            })
    })
}

showMeLastGoodsNode("  Привет ")
///showMeLastGoodsNode