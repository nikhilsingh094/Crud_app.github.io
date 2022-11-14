let id ='no';
// localStorage.clear();
selectData();
function manageData(){
    document.getElementById('msg').innerHTML="";
    let name = document.getElementById('name').value;

    if(name==''){
        document.getElementById('msg').innerHTML = "Please Enter Something";
    }else{
        if(id=="no"){
           let arr =  crudData();
            if(arr==null){
                let data = [name];
                localStorage.setItem('crud',JSON.stringify(data));
            }else{
                arr.push(name);
                localStorage.setItem('crud',JSON.stringify(arr));
            }
            
           
            document.getElementById('msg').innerHTML="Data Added";
        }else{
            let arr = crudData();
            arr[id] = name;
            localStorage.setItem('crud',JSON.stringify(arr));
            document.getElementById('msg').innerHTML="Data updated";
        }
        document.getElementById('name').value="";
        selectData();
    }
}

function selectData(){
  let arr =  crudData();
    if(arr!=null){
        let html ="";
        let sno = 1;

        for(let k in arr){
            html = html+`<tr><td>${sno}</td><td>${arr[k]}</td><td><a href="javascript:void(0)" class="btn btn-success" onclick="editData(${k})">Edit</a>&nbsp;<a href="javascript:void(0)" class="btn btn-danger" onclick="deleteData(${k})">Delete</a></td></tr>`;
            sno++;
        }
        document.getElementById('root').innerHTML=html;
    }
}


function editData(rid){
    id =rid;
    let arr = crudData();
     document.getElementById('name').value = arr[rid];

}


function deleteData(rid){
    let arr = crudData();
    arr.splice(rid,1);
    localStorage.setItem('crud',JSON.stringify(arr));
    selectData();
}


function crudData(){
    let arr = JSON.parse(localStorage.getItem('crud'));
    return arr;
}