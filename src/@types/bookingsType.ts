export interface BookingsType {
    photo: string,
    id: string,
    guest: string,
    orderDate: {
      date: string,
      hour: string
      },
    checkin: {
      date: string,
      hour: string
      },
    checkout: {
      date: string,
      hour: string
      },
    roomId: number,
    price: number,
    amenities: string[],
    typeRoom: string,
    specialRequest?: string
    description: string,
    status: string
}