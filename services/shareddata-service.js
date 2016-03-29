window.app.factory('SharedDataService', [function () {
    var sharedDataService = this;
    var sharedTicketData = undefined;

    function SetSharedTicketData(data) {
        sharedTicketData = data;
    }

    function GetSharedTicketData() {
        return sharedTicketData;
    }

    function SharedTicketDataExists() {
        var sharedTicketDataExists = false;

        if (sharedTicketData !== undefined) {
            sharedTicketDataExists = true;
        }

        return sharedTicketDataExists;
    }

    sharedDataService.ticketTypes = [{
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

    sharedDataService.statusTypes = [{
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

    sharedDataService.priorityTypes = [{
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
        SetSharedTicketData: SetSharedTicketData,
        GetSharedTicketData: GetSharedTicketData,
        SharedTicketDataExists : SharedTicketDataExists,
        ticketTypes: sharedDataService.ticketTypes,
        statusTypes: sharedDataService.statusTypes,
        priorityTypes: sharedDataService.priorityTypes
    }

    }]);