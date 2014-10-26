 var  DataTable; 

 function BuildData(){

 	var myHtml  = "<table  id=\"Employees\"class=\" table table-bordered\">";
 	
 	myArray = DataTable.Data.employees;

 	// ----------------- Создаем динамически струткутру таблицы------------------
 	 myHtml += "<tr>"; 

 	 for (var header in myArray[0]) {				// заполняем динамически струткутру сотрудника
	 	      myHtml += "<th>" +  header  + "</th>";	
	 	   }

	 myHtml +=  "</tr>"; 	   
 	
  	// ------------------- Наполняем данными -------------- 
  	 $.each( myArray, function( i, item ) {  	// цикл по сторудникам
 	 
 	   myHtml += "<tr>"; 

		   for (var prop in item) {			// заполняем свойствами сотрудника

		   	switch (prop) {
		   	   case "Salary":
		   	      myHtml += "<td>" + "$" +Math.floor(item[prop])  + "</td>"; 		// зарплата без центов
		   	      break;
		   	   case "Manager":
		   	   case "Certificate":
		   	      myHtml += "<td>" + (item[prop]===true? "да" : "нет") + "</td>";	// удобочитаемые логические  значения
		   	      break;
		   	   case "Rate":
		   	      {
		   	      	if (parseFloat(item[prop])>0) {
		   	      		myHtml +=  "<td class = \"More\" >" + item[prop]  + "</td>"; 
		   	      	}
		   	      	else if  (parseFloat(item[prop])<0) {
		   	      		myHtml +=  "<td class = \"Less\" >" + item[prop]  + "</td>"; 
		   	      	}
		   	      	else	
		   	      		myHtml += "<td>" +  parseFloat(item[prop])  + "</td>";
		   	      };
		   	      break; 
		   	   default:
		   	      myHtml += "<td>" +  item[prop]  + "</td>";	
		   	}
	 	      
	 	   }
 	  
 	   myHtml +=  "</tr>";
 	 
 	});
 	
 myHtml +=  "</table>"; 

 $("#Employees").html( myHtml ); // прорисовываем таблицу 

 } 

 $(document).ready(function(){

 	DataTable = {
 		SearchField:"Firstname",
 		OrderSortUp:true,
 		Data: []
 	};

 	$.ajax({		// read data from JSON 
 	      
 	      type: "GET",
 	      url: "data/Empls.json",
 	      dataType: "json",
 	      async:false,
 	      cache:false,
 	      
 	      success: function( json ) {

 	      	DataTable.Data = json;
 	    
 	         BuildData(); 		// операции с DOM сведены к минимуму
 	      },

 	      error: function( xhr, status, errorThrown ) {
 	             console.log( "Error: " + errorThrown );
 	             console.log( "Status: " + status );
  	         }
 	  });

 	//$("#Employees td.More").css("background", "#DEDEFE");
 	//$("#Employees td.Less").css("background", "#FEDAE0");

 	// намного быстрее так CSS биндится для td  чем выше вариант
 	$( "<style> #Employees td.More { background-color: #DEDEFE } td.Less { background-color: #FEDAE0 } 	</style>")
 	 .appendTo( "head" );
 });