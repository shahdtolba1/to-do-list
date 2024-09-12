const inputBox=document.getElementById('inputBox');
const list=document.getElementById('list');
const addBtn=document.getElementById('addBtn');
var currenttaskLi=null;
addBtn.onclick=function()
{
    if(addBtn.innerHTML=='Add')
    {
        addTask();
    }
    else
    {
        updateTask();

    }
     inputBox.value = '';
}
function getTaskFromLocal()
{
   const oldTasks=JSON.parse(localStorage.getItem('tasks'));
   for(var i=0; i<oldTasks.length; i++)
   {
     let li=document.createElement('li');
     let text=document.createElement('p');
     text.classList.add('content-text');
     text.innerHTML=oldTasks[i].content;
     li.append(text);
     let span=document.createElement('span');
     span.innerHTML="<i class='fa-solid fa-trash' ></i> ";
     li.append(span);
     let icon=document.createElement('icon');
     icon.innerHTML=`<i class='fa-solid fa-pen-to-square' ></i> `;
     icon.classList.add('edit-btn');
     li.append(icon);
     if(oldTasks[i].checked==true)
     {
        li.classList.add('checked');
     }



     list.append(li);
     
     

   }

}
getTaskFromLocal();

function addTask(){
    if(inputBox.value=='')
    {
        alert('You must write something...');
    }
    else
    { 
        let li=document.createElement('li');
        let taskContant=document.createElement('p')
        taskContant.classList.add('content-text');
        taskContant.innerHTML=inputBox.value;
        li.appendChild(taskContant);
        let span=document.createElement('span');
        span.innerHTML="<i class='fa-solid fa-trash' ></i> ";
        li.appendChild(span);
        let icon=document.createElement('icon');
        icon.innerHTML=`<i class='fa-solid fa-pen-to-square' ></i> `;
        icon.classList.add('edit-btn');
        li.appendChild(icon);

        list.prepend(li);
 
        inputBox.value = '';
        setlocalStorage(list);
    }
    
}
function editTask(taskLi) {
    currenttaskLi = taskLi; 
    inputBox.value = currenttaskLi.textContent; 
    addBtn.innerHTML = 'Update'; 
}

function updateTask() {
    var task = inputBox.value;
    if (currenttaskLi!=null) { 
        currenttaskLi.querySelector('.content-text').textContent = task; 
        addBtn.innerHTML = 'Add';
        inputBox.value = '';  
        setlocalStorage(list);
    }
    
}
list.addEventListener('click',(e)=>{
    if(e.target.tagName==='LI')
    {
        e.target.classList.toggle("checked");
        let editIcon=e.target.querySelector('icon');
        if(e.target.classList.contains("checked"))
        {
            list.append(e.target);
            console.log(editIcon);
            editIcon.remove();
        }            
        else{
            let icon=document.createElement('icon');
           icon.innerHTML=`<i class='fa-solid fa-pen-to-square' ></i> `;
           icon.classList.add('edit-btn');
           e.target.appendChild(icon);
           list.prepend(e.target);

        } 
        setlocalStorage(list);
        
      

       
    }
    else if(e.target.tagName=='SPAN')
    {
        e.target.parentElement.remove(); 
        setlocalStorage(list);   
    }
    else if (e.target.className=='edit-btn')
    {
        editTask( e.target.parentElement);
    }   
})
function setlocalStorage(list)
{
    let tasks =[];
    var elements =list.querySelectorAll('li');
    for(var i=0 ; i<elements.length;i++)
    {
         var newTask={
            content:elements[i].textContent,
           checked:elements[i].classList.contains('checked'),
         }
        tasks.push(newTask);
    }

    localStorage.setItem('tasks',JSON.stringify(tasks));
}









