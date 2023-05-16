export interface BookingsType {
  photo: string,
  id: string,
  guest: string,
  orderDate: Date,
  checkin: Date,
  checkout: Date,
  room_Id: string,
  price: number,
  amenities: string,
  specialRequest?: string
  description: string,
  status: string
}