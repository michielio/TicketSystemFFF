window.app.factory('SharedDataService', [function () {
    var sharedTicketData = {} ;

    function SetSharedTicketData(data) {
        console.log("before");
        console.log(data);
        sharedTicketData = data;
    }

    function GetSharedTicketData() {
        return sharedTicketData;
    }
    
    this.ticketTypes = [{
            id: 1,
            name: "feature"
            },
        {
            id: 2,
            name: "bug"
            }, {
            id: 3,
            name: "unclear"
            }, {
            id: 4,
            name: "other"
            }];

    this.statusTypes = [{
            id: 1,
            name: "unsigned"
            },
        {
            id: 2,
            name: "unsolved"
            }, {
            id: 3,
            name: "work in progress"
            }, {
            id: 4,
            name: "solved"
            }];

    this.priorityTypes = [{
            id: 1,
            name: "low"
            },
        {
            id: 2,
            name: "average"
            }, {
            id: 3,
            name: "high"
            }, {
            id: 4,
            name: "top priority"
            }];
    
    
    return {
        SetSharedTicketData : SetSharedTicketData,
        GetSharedTicketData : GetSharedTicketData,
        ticketTypes : this.ticketTypes,
        statusTypes : this.statusTypes,
        priorityTypes : this.priorityTypes
    }

    }]);