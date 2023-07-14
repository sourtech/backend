export default class TicketRepository {

    constructor(dao){
        this.dao = dao;
    }

    createTicket = (options, req, paginate) => {
        return this.dao.createTicket(options, req, paginate);
    }
}