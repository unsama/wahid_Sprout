import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"

export default{
    created: function () {
        var self = this;
        this.select();
        this.select1();
        this.select12();
        var del = []; // initialize empty arrays
        $(function(){
            $("#action").hide();
            $(".checkBoxClass").click(function () {
                if($(this).prop('checked')){
                    $("#action").show();
                }else{
                    $("#action").hide();
                }
            });
            $(".delete").click(function () {
                $(".checkBoxClass:checked").each(function(){
                    del.push($(this).val());
                });
                console.log(del);
                self.delete(del);
            });
        });
    },
    data () {
        return {
            num: '',
            sum: '',
            counter: 1,
            nextactivity: "Allocation Request",
            btnlinks: {
                createbtnlink:"/leaves/leave_create",
                importbtnlink:"/leaves/leaves_allocation_import",
                deletedropbtnlink:"",
                duplicatebtnlink:"",
                planorderbtnlink:"",
            },
            tableheader: [
                "ID",
                "Employees",
                "Allocation Mode",
                "Leave type",
                "Description",
                "Allocated Days",
                "Start Date",
                "End Date",
                "Status",
            ],
            tablefooter: [
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
            ],
            tabledata: {
                "row": {


                },

            }
        }
    },
    methods: {
        delete: function (del) {
            var self = this;
            console.log("a"+del);
            self.$http.post("/leaves/delete_allocation", {"delete_items": del}).then(function(res){
                //console.log(res.body);
            },function(err){
            });
        },
        select3: function () {
            var self = this;
            self.counter+=1;
            self.$http.post("/leaves/allocationrequesttablenext", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.employeename,
                                val.MODE,
                                val.type,
                                val.description,
                                val.duration,
                                val.date_from,
                                val.date_to,
                                val.status,
                            ],
                            "url": "/leaves/Department_leave_select/"+val.id,
                        });
                        console.log(data);
                    });
                }

            },function(err){

            });
        },
        select4: function () {
            var self = this;
            self.counter-=1;
            self.$http.post("/leaves/allocationrequesttableback", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.employeename,
                                val.MODE,
                                val.type,
                                val.description,
                                val.duration,
                                val.date_from,
                                val.date_to,
                                val.status,
                            ],
                            "url": "/leaves/Department_leave_select/"+val.id,
                        });
                        console.log(data);
                    });
                }

            },function(err){

            });
        },
        select1: function () {
            var self = this;
            self.$http.post("/leaves/leave_allocaion_num", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.num = parentdata.count;
            }, function (err) {

            });
        },
        select12: function () {
            var self = this;
            self.$http.post("/leaves/sum", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.sum = parentdata.sum;

            }, function (err) {

            });
        },
        select: function () {
            var self = this;
            self.$http.post("/leaves/allocationrequesttable", {
                "name": self.options,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.employeename,
                                val.MODE,
                                val.type,
                                val.description,
                                val.duration,
                                val.date_from,
                                val.date_to,
                                val.status,
                            ],
                            "url": "/leaves/leaves_select/"+val.id,
                        });
                        console.log(data);
                    });
                }

            },function(err){

            });
        },
        validateBeforeSubmit() {
            this.$validator.validateAll().then(() => {
                // eslint-disable-next-line
                // this.submiting();

            }).catch(() => {
                // eslint-disable-next-line//  alert('Correct them errors!');
            });
        }
    },


    components: {
        DashboardController,
        TableMain
    }
}