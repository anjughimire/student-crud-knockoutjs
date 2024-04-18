function StudentModel(data){
    this.id = ko.observable(data.id);
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    this.email = ko.observable(data.email);
    this.gender = ko.observable(data.gender);

}

function studentViewModel(){
    var self = this;
    self.id = ko.observable("");
    self.name = ko.observable("").extend({
        required : true,
        minLength : 2,
        // validation: {
        //     message : "Please Enter at least 2 character",
        //     validator : function(value){
        //         //console.log('Value',value);
        //         return value.length > 1
        //     }
        // }
    })
    // self.name.subscribe(function(newValue){
    //     console.log('new value', newValue);
    // })
    self.address = ko.observable("").extend({
        required : true,
        minLength : 2,
    });
    
    self.email = ko.observable("").extend({
        required : true,
        email : true
    });

    self.gender = ko.observable();

    self.hasBeenSubmitted = ko.observable(false);
    self.studentList = ko.observableArray([]);


//self.studentList.subscribe(console.log)


    self.handleSubmit=()=>{
        var errors =  ko.validation.group(self);
        if(errors().length > 0){
            errors.showAllMessages();
            return
        }
        
        var subObj ={
            name: self.name(),
            address : self.address(),
            email : self.email(),
            gender : self.gender()
        }      
        self.studentList.push(new StudentModel(subObj));  
        self.hasBeenSubmitted(true);
    }

    self.resetStudent=()=>{
        self.id("");
        self.name("");
        self.address("");
        self.email("");
        self.gender("");
    }
    
    self.newRecord=()=>{
        self.hasBeenSubmitted(false)
        self.resetStudent();
    }

    self.deleteStudent=(value)=>{
        self.studentList.remove(value)
    }
};

const knockoutApp = document.querySelector("#knockout-app");
ko.applyBindings(new studentViewModel(), knockoutApp);