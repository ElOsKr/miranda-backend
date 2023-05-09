export interface BookingsType {
  booking_photo: string,
  booking_id: string,
  booking_guest: string,
  booking_orderDate: Date,
  booking_checkin: Date,
  booking_checkout: Date,
  room_Id: string,
  booking_price: number,
  booking_amenities: string,
  booking_specialRequest?: string
  booking_description: string,
  booking_status: string
}