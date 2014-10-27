 var  DataTable; 

function AddEvent(){		// переназначаем обработчики после обновления таблицы

 	$( "#Employees th").on( "click", function( eventObject ) {
 	   
 	   var elem = $(this);

 	   if (elem.text()!="Manager" && elem.text()!="Certificate"){

 	   	 DataTable.SearchField = elem.text();

 	   	 console.log("Clicking on " + elem.text());

 	   	 if(elem.hasClass("Up")){DataTable.OrderSortUp=false};		// переключение сортировки
 	   	 if(elem.hasClass("Down")){DataTable.OrderSortUp=true};

 	   	 SortData(DataTable.Data.employees,DataTable.SearchField,DataTable.OrderSortUp); 
 	   	  
 	    //$("#Employees").html(" ");
 	   	
 	   	 BuildData(DataTable.Data.employees); 
 	    }

 	});
 }	
//---------------------------------------- Сортировка данных ----------------------------
 function SortData(arr,sortstr,order){
 		
 		if (sortstr=="FirstName" || sortstr=="LastName"  || sortstr=="Department" ){ //сортировка по алфавиту
 			arr.sort(function(a,b){
 			var fielda=a[sortstr].toLowerCase()
 			var fieldb=b[sortstr].toLowerCase()
 			if (order==true)
 				{ return (fielda<fieldb)? -1 : (fielda>fieldb)? 1 : 0 }
 			else
 				{ return (fielda<fieldb)? 1 : (fielda>fieldb)? -1 : 0 }
 			})
 		}
 		if(sortstr=="Rate" || sortstr=="Salary" ){				// сортировка по числам
			
 			arr.sort(function(a,b){
 			var fielda=(+a[sortstr])
 			var fieldb=(+b[sortstr])
 			if (order==true)
 				{ return (fielda>fieldb)? 1 : (fielda<fieldb)? -1 : 0 }
 			else
 				{ return (fielda>fieldb)? -1 : (fielda<fieldb)? 1 : 0 }
 		   })
  		}
}
 
//----------------------------------------Создание таблицы ----------------------------
 function BuildData(arr){

 	var myHtml;
 	
 	myArray = arr;

 	// ----------------- Создаем динамически струткутру таблицы------------------
 	 myHtml += "<tr>"; 

 	 for (var header in myArray[0]) {				// заполняем динамически струткутру сотрудника
	 	     
	 	     if(header == DataTable.SearchField){
	 	     	if(DataTable.OrderSortUp==true){
	 	     		myHtml += "<th class=\"Up\">" +  header  + "</th>";
	 	     	}
	 	     	else if (DataTable.OrderSortUp==false){
	 	     		myHtml += "<th class=\"Down\">" +  header  + "</th>";
	 	     	}
	 	     }
	 	     else
	 	      { myHtml += "<th>" +  header  + "</th>";}	
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
 	

 //$("#Employees").html(" ");

 $("#Employees").html( myHtml ); // прорисовываем таблицу 

 AddEvent();

 } 

 //------------------------------ Main --------------------------------------------
 $(document).ready(function(){

 	DataTable = {					// создаем модель таблицы
 		SearchField:"FirstName",
 		OrderSortUp:true,
 		Data: []
 	};

 	$.ajax({		// читаем с  JSON 
 	      
 	      type: "GET",
 	      url: "data/Empls.json",
 	      dataType: "json",
 	      async:false,
 	      cache:true,
 	      
 	      success: function( json ) {

 	      	DataTable.Data = json;

 	      	SortData(DataTable.Data.employees,DataTable.SearchField,DataTable.OrderSortUp) // первоночальная сортировка по  FirstName
 	    
 	        BuildData(DataTable.Data.employees); 		// операции с DOM сведены к минимуму
 	      },

 	      error: function( xhr, status, errorThrown ) {
 	             console.log( "Error: " + errorThrown );
 	             console.log( "Status: " + status );
  	         }
 	  });

 });

// намного быстрее CSS биндится для td  
$( "<style> #Employees td.More { color: #0606CE } td.Less { color: #F30535 } 	</style>")
 .appendTo( "head" );

