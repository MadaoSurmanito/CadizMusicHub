function getHello(){
 $.ajax({ 
      type: "GET",
      url: "http://localhost:8080/",
      success: function(data){        
              $("#resGetHello").html(data);
      },
      error:function(res){
              alert("ERROR: " + res.statusText);  
      }
  });
}


function getHelloAndGoodbye() {
  $.when(
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/hello"
    }),
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/goodbye"
    })
  ).done(function(helloRes, goodbyeRes) {
    $("#resGetHello").html(helloRes[0]);
    $("#resGetGoodbye").html(goodbyeRes[0]);
  }).fail(function(res) {
    alert("ERROR: " + res.statusText);
  });
}