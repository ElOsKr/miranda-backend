export interface ContactsType {
    id: string,
    customer: {
        name: string,
        email: string,
        phone: number
    },
    subject: string,
    comment: string,
    status?: boolean
}