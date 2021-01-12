import { LightningElement, track } from 'lwc';

export default class TodoApp extends LightningElement {
    toDoID = 3;
    taskDetails = '';
    
    @track toDos = [
        {id: 1, taskdetails: 'This is the first task added'},
        {id: 2, taskdetails: 'This is the second task added'}
    ];

    handlechange(event){
        this.taskDetails = event.target.value;
    }
    
    addToDo(){
        console.log(this.taskDetails);
        this.toDoID += 1;
        this.toDos = [
            ...this.toDos,
            {
                id: this.toDoID,
                taskdetails: this.taskDetails
            }
        ];
        this.taskDetails = '';
    }

    removeToDo(event){
        alert('Request To Delete: '+event.target.value);
    }
}