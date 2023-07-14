import ticketModel from "../models/ticket.js";

export default class TicketManager {

    createTicket  = async (params, req, paginate=false) => {
        let filter = {};
        return ticketModel.findOne(params).lean();
    };
}