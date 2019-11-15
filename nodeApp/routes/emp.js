const mysql = require("mysql");
var  express = require("express");
var Joi=require("joi");
var emprouter = express();

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'manager',
    database:'k_dac'
});

var mydata=[];
connection.connect();

function validate(bodyContent)
{
    const schema= {
        "Ename":Joi.string().length(6).required(),
        "ENo":Joi.number().required(),
        "Esalary":Joi.number().required()
    };
    return Joi.validate(bodyContent,schema);

}

emprouter.post("/",function(request,response){
    let resultOfValidation= validate(request.body);
    if(resultOfValidation.error==null)
    {
    let eno=parseInt(request.body.ENo);
    let ename= request.body.Ename;
    let esalary= request.body.Esalary;
    let query= `insert into emp values(${eno},'${ename}','${esalary}')`;
    console.log(query);
    connection.query(query,function(err,result){
        if(err==null)
        {
            response.contentType("application/json");
            response.send(JSON.stringify(result));
        }
        else
        {
            response.contentType("application/json");
            response.send(err);
        }
        
    });
    }
    else{
        response.contentType("application/json");
        response.send(JSON.stringify(resultOfValidation));
    }
});

emprouter.put("/:ENo",function(request,response){
    let eno=parseInt(request.params.ENo);
    let ename= request.body.Ename;
    let esalary= request.body.Esalary;

    let query=`update emp set Ename= '${ename}', Esalary='${esalary}' where ENo=${eno}`;
    console.log(query);
    
    connection.query(query, function(err,result){
            if(err==null)
            {
                response.contentType("application/json");
                response.send(JSON.stringify(result));
            }
            else
            {
                response.contentType("application/json");
                response.send(err);
            }
    });
});

emprouter.delete("/:ENo",function(request,response){
    let eno=parseInt(request.params.ENo);

    let query=`delete from emp where ENo= ${eno}`;
    console.log(query);

    connection.query(query, function(err,result){
        if(err==null)
        {
            response.contentType("application/json");
            response.send(JSON.stringify(result));
        }
        else
        {
            response.contentType("application/json");
            response.send(err);
        }
    });
});

emprouter.get("/", function(request, response){
    connection.query("select * from emp", function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
    });
    
});

emprouter.get("/:No", function(request, response){
    console.log("You searched for " + request.params.No);
    
    connection.query(`select * from emp where no =${request.params.No}`, function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
    });
    
});

module.exports=emprouter;