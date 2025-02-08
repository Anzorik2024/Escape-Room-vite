import { DateRaw } from '../../const/date';
import { QuestPreview } from '../quest/quest-types';
import { Location } from '../quest/quest-types';

export type BookingInfo = {
date: DateRaw;
time: string;
contactPerson: string;
phone: string;
withChildren: boolean;
peopleCount: number;
locationId: number;
questId: number;
}

export type Reservation = {
    date: DateRaw;
    time: string;
    contactPerson: string;
    phone: string;
    withChildren: boolean;
    peopleCount: number;
    id: number;
    location: Location;
    quest: QuestPreview;
}

export type ReservationProcess = {
  reservations: ReservationsData;
  isReservationsLoading: boolean;
  isReservationsDeleteLoading: boolean;
}


export type ReservationsData = Reservation[];
