export interface ContactsType {
    id: string,
    customer: {
        name: string,
        email: string,
        phone: number
    },
    sended: Date,
    subject: string,
    comment: string,
    status?: boolean
}