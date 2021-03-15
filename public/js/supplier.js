function c (i) {console.log(i)}
function cl (i) {console.log(i)}
c("welcome to supplier page js")

// наш блятский фетч
function showMeSupplierFunction (){
    cl (document.querySelector('#showMeSupplierValueHtml').value)
  fetch ('/showMeSupplierNode', {
      method: 'POST',
      body: JSON.stringify({id:document.querySelector('#showMeSupplierValueHtml').value}),
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  })
  .then(function(response) {
      return response.json()
      cl (response)
  })
  .then(function(data) {




       cl (data)
    //UPDATE `lili`.`suppliers` SET `phone` = 'unknown' WHERE (`id` = '1');
    //UPDATE `lili`.`suppliers` SET `firstName` = 'Андрей  Миненко', `unigURL` = '191182060 ', `contact_message` = ' ', `phone` = 'unknown ', `url1` = ' ', `url2` = ' ', `comment` = ' ' WHERE (`id` = '1');
    //<input type="submit", value="Сохранить в базу данных" class="submit"> </input>
    showMeSupplierInjection.outerHTML = `
          <div class="brd" id ="showMeSupplierInjection">
                <form action="/updateSupplier" method="get"  autocomplete="off"  >
                <input class="inline" type="text" value="${data[0].id}" name="id" id="width100PX"> id   </input>  <br>
                <input class="w300pxReal" type="text" value="${data[0].firstName}"  name="firstName" >имя    </input>  <br>
                <input class="w300pxReal" type="text" value="${data[0].phone}"  name="contact_message">контактная страница</input> <br>
                <input class="w300pxReal" type="text" value="${data[0].phone}"  name="phone">телефон   </input> <br>
                <input class="w300pxReal" type="text" value="${data[0].unigURL}"  name="unigURL">уникальный урл   </input> <br>
                <input class="w800px" type="text" value="${data[0].url1}" name="url1">ссылка1</input> <br>
                <input class="w800px" type="text" value="${data[0].url2}" name="url2">ссылка2</input> <br>
                <input class="w800px" type="text" value="${data[0].comment}" name="comment" id="width600PX">Комментарий </input> <br>
             
                <button  class="submit" >Отредактировать поставщика</button>
                

              </form>
 
            
          </div> 
                ` 
      
  })
}