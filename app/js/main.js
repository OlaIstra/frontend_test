//входные данные (глобальная переменная)
let infor = [{ first:'Идентификатор', second:'Название', third:'Стоимость', forth:'Количество'},
		[1, 'iPhone 5', '400', 5],
		[2, 'XBOX', '300', 7]];

$(document).ready(function(){

//создание таблицы

	$("#table").append("<thead></thead>");
	$('thead').append("<tr><th data-type='number'>" + infor[0].first + "</th><th  data-type='string'>" + infor[0].second + "</th><th  data-type='number'>" + infor[0].third + "</th><th  data-type='number'>" + infor[0].forth + "</th><th>" + "удалить" + "</th></tr>");
	$('#table').append("<tbody id='tbody'></tbody>")

	function createTable() {
		for (let i = 1; i < infor.length; i++) {
			console.log("start");
			$("#tbody").append("<tr id='" + i +"'><td>" + infor[i][0] + "</td><td>" + infor[i][1] + "</td><td>" + infor[i][2] + "</td><td>" + infor[i][3] + "</td><td><span class='btn btn-danger minus pull-right'>&ndash;</span></td></tr>");
		}
	}

	createTable();

	//добавление полей
    $('#add__btn').click(function(){
		$('tbody').append(
		'<tr>' +
			'<td><input type="text" id="number"></td>' +
			'<td><input type="text" id="name"></td>' +
			'<td><input type="text" id="price"></td>' +
			'<td><input type="text" id="amount"></td>' +
			'<td><span class="btn btn-danger minus pull-right">&ndash;</span></td>' +
		'</tr>'
		);	

		$(".table").append("<button id='save__btn'> Сохранить </button>");

		//вводимая информация сохраняется в глобальной переменной, только если все поля заполнены
		$('#save__btn').click(function(){ 
			if (($('#number').val()) && ($('#name').val()) && ($('#price').val()) && ($('#amount').val())) {
				infor.push([$('#number').val(),$('#name').val(),$('#price').val(),$('#amount').val()]);	
			}			
			$('#save__btn').remove();
			$('#tbody').empty();
			createTable();
		})		
	});

     // удаление строки с полями и удаление информации из глобальной переменной
	$(document).on('click', '.minus', function(){
		$( this ).closest( 'tr' ).remove();
		infor.splice(this.closest( 'tr' ).id,1);
	});

	// сортировка таблицы
    const table = document.querySelector('#table');
    const thArray = table.querySelectorAll('th');
    let elem;

    //отлавливаем клик по ячейке в шапке таблицы
    table.onclick = function(e) {
    	elem = e.target;
    	if (e.target.tagName != 'TH') return;
    	sortTable(e.target.cellIndex, e.target.getAttribute('data-type'));
    	thArray.forEach(function(th){
    		th.classList.toggle('toUpper'); 
    	})     	
    };

    function sortTable(colNum, type) {
    	let tbody = table.getElementsByTagName('tbody')[0];
		let rowsArray = [].slice.call(tbody.rows);
	    let toUpper; //сортировка по возрастанию
	    let toLower; //сортировка по убыванию

	    switch (type) {
	        case 'number':
	          toUpper = function(rowA, rowB) {
	            return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
	          };
	          break;
	        case 'string':
	          toUpper = function(rowA, rowB) {
	            return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML;
	          };
	          break;
	    }

	    switch (type) {
	        case 'number':
	          toLower = function(rowA, rowB) {
	            return rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML;
	          };
	          break;
	        case 'string':
	          toLower = function(rowA, rowB) {
	            return rowA.cells[colNum].innerHTML < rowB.cells[colNum].innerHTML;
	          };
	          break;
	    }

	    (elem.classList.contains('toUpper')) ? rowsArray.sort(toLower) : rowsArray.sort(toUpper);
	    
	    table.removeChild(tbody);
      	for (let i = 0; i < rowsArray.length; i++) {
        	tbody.appendChild(rowsArray[i]);
    	}
      	table.appendChild(tbody);
    }
});
